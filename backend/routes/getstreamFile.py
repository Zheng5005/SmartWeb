from fastapi import APIRouter, Depends, HTTPException
from getstream import Stream
from getstream.models import UserRequest
from config import STREAM_API_KEY, STREAM_API_SECRET, STREAM_BASE_URL
from uuid import uuid4
from urllib.parse import urlencode
import httpx, uuid, jwt, webbrowser, os

router = APIRouter(prefix="/getstream", tags=["getstream"])

client = Stream(api_key=STREAM_API_KEY, api_secret=STREAM_API_SECRET, base_url=STREAM_BASE_URL)

user_id = f"user-{uuid.uuid4()}"  # Generar un ID de usuario único para cada sesión

@router.post("/token")
async def generate_token(user_id: str):
    try:
        client.upsert_users(UserRequest(id=user_id, name="Jane Doe"))
        user_token = client.create_token(user_id, expiration=3600)
        return {"user_id": user_id, "token": user_token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create/call")
async def create_call(user_id: str):
    try:
        # Asegurar que el usuario exista
        client.upsert_users(UserRequest(id=user_id, name=user_id))

        # Crear token válido 1 hora
        user_token = client.create_token(user_id, expiration=3600)

        # Crear ID único para la llamada
        call_id = str(uuid.uuid4())
        call = client.video.call("default", call_id)

        # Crear llamada en Stream
        response = call.get_or_create(data={"created_by_id": user_id})

        # Generar URL para unirse a la llamada
        params = {
            "api_key": client.api_key,
            "token": user_token,
            "skip_lobby": "true",
        }

        base_url = os.getenv("EXAMPLE_BASE_URL", "https://video.stream-io-api.com")
        join_url = f"{base_url}/join/{call_id}?{urlencode(params)}"

        # 🟢 Devolver solo los datos útiles (sin el objeto StreamResponse)
        return {
            "call_id": call_id,
            "user_id": user_id,
            "join_url": join_url,
            "stream_response": response.data  # <-- solo el diccionario, seguro para JSON
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creando llamada: {str(e)}")