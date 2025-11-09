# signaling.py
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi import Depends, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any
from collections import defaultdict
import uuid

router = APIRouter(prefix="/signaling", tags=["Signaling"])

# In-memory room structure (replace with persistent in prod)
rooms: Dict[str, Dict[str, Any]] = defaultdict(lambda: {
    "peers": {},        # peer_id -> websocket
    "presenter": None,  # peer_id of current presenter
    "professors": set(),# peer_ids marked as professor
})

def make_message(type: str, payload: dict):
    return json.dumps({"type": type, "payload": payload})

@router.websocket("/ws/{room_id}/{peer_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, peer_id: str):
    await websocket.accept()
    # For demo: assume query param role=professor or student (could be JWT validated)
    role = websocket.query_params.get("role", "student")
    room = rooms[room_id]
    room["peers"][peer_id] = websocket
    if role == "professor":
        room["professors"].add(peer_id)

    # Notify existing peers about the new peer
    join_payload = {"peer_id": peer_id, "role": role}
    for pid, ws in room["peers"].items():
        if pid == peer_id: continue
        await ws.send_text(make_message("peer-joined", join_payload))

    # Send list of current peers to the newcomer
    current = [{"peer_id": pid, "role": ("professor" if pid in room["professors"] else "student")} for pid in room["peers"] if pid != peer_id]
    await websocket.send_text(make_message("current-peers", {"peers": current, "presenter": room["presenter"]}))

    try:
        while True:
            text = await websocket.receive_text()
            msg = json.loads(text)
            t = msg.get("type")
            payload = msg.get("payload", {})

            # Forward signalling (offer/answer/ice)
            if t in ("offer", "answer", "ice"):
                target = payload.get("target")
                if target and target in room["peers"]:
                    await room["peers"][target].send_text(make_message(t, {**payload, "from": peer_id}))
            elif t == "request-present":
                # send a present-request to professors (or to the single professor)
                # attach requester id
                for prof_id in room["professors"]:
                    await room["peers"][prof_id].send_text(make_message("present-request", {"requester": peer_id}))
            elif t == "present-approve":
                # payload: {"requester": "<id>"}
                requester = payload.get("requester")
                # set presenter (only one)
                room["presenter"] = requester
                # notify all peers of new presenter
                for pid, ws in room["peers"].items():
                    await ws.send_text(make_message("present-approved", {"presenter": requester}))
            elif t == "present-stop":
                room["presenter"] = None
                for pid, ws in room["peers"].items():
                    await ws.send_text(make_message("present-stopped", {"peer": peer_id}))
            elif t == "chat":
                # broadcast chat message
                text_msg = payload.get("message")
                sender = payload.get("sender")
                for pid, ws in room["peers"].items():
                    await ws.send_text(make_message("chat", {"message": text_msg, "sender": sender}))
            elif t == "leave":
                break
            else:
                # unknown type - ignore or log
                pass

    except WebSocketDisconnect:
        pass
    finally:
        # cleanup
        if peer_id in room["peers"]:
            del room["peers"][peer_id]
        if peer_id in room["professors"]:
            room["professors"].remove(peer_id)
        if room["presenter"] == peer_id:
            room["presenter"] = None
            for pid, ws in room["peers"].items():
                await ws.send_text(make_message("present-stopped", {"peer": peer_id}))
        # notify remaining peers
        for pid, ws in room["peers"].items():
            await ws.send_text(make_message("peer-left", {"peer_id": peer_id}))
