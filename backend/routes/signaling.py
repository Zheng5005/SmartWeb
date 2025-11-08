import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any
from collections import defaultdict
from model.models import Sesiones_Virtuales, Cursos, Inscritos_Curso
from config import SessionLocal
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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.websocket("/ws/{room_id}/{peer_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, peer_id: str, db: Session = Depends(get_db)):
    token = websocket.query_params.get("token")
    role = websocket.query_params.get("role", "student")

    # 🔒 Validar token (usa tu función JWT actual)
    from services.jwt import verify_token_ws
    try:
        user = verify_token_ws(token)
    except Exception:
        await websocket.close(code=403)
        return

    # Verificar si el usuario pertenece a la sesión
    sesion = db.query(Sesiones_Virtuales).filter(
        Sesiones_Virtuales.enlace_llamada == room_id
    ).first()
    if not sesion:
        await websocket.close(code=404)
        return

    curso = db.query(Cursos).filter(Cursos.id == sesion.id_curso).first()
    if not curso:
        await websocket.close(code=404)
        return

    # 🔍 Confirmar que el usuario esté inscrito o sea profesor
    if curso.profesor_id != user.id:
        inscripcion = db.query(Inscritos_Curso).filter(
            Inscritos_Curso.id_curso == curso.id,
            Inscritos_Curso.id_estudiante == user.id,
            Inscritos_Curso.estado_invitacion == "Aceptada"
        ).first()
        if not inscripcion:
            await websocket.close(code=403)
            return
        role = "student"
    else:
        role = "professor"

    # ✅ Aceptar conexión solo después de validar
    await websocket.accept()
