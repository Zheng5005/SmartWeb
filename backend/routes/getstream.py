from fastapi import APIRouter, Depends, HTTPException
from config import STREAM_API_KEY, STREAM_API_SECRET
import httpx, time, jwt

routes = APIRouter(prefix="/getstream", tags=["GetStream"])

# =============================
# 🔐 Función para generar tokens Stream seguros
# =============================
def generate_stream_token(user_id: str):
    payload = {
        "user_id": user_id,
        "exp": int(time.time()) + 3600  # 1 hora de validez
    }
    token = jwt.encode(payload, STREAM_API_SECRET, algorithm="HS256")
    return token


# =============================
# 🎥 Crear una llamada (videollamada)
# =============================
@routes.post("/create_call/{user_id}")
async def create_call(user_id: str):
    token = generate_stream_token(user_id)
    call_id = f"meeting-{user_id}"

    headers = {
        "Authorization": token,
        "stream-auth-type": "jwt",
    }

    data = {
        "data": {
            "created_by_id": user_id
        }
    }

    url = f"https://video.stream-io-api.com/api/v1/call/default/{call_id}/create"

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return {
        "message": "Llamada creada correctamente",
        "call_id": call_id,
        "call_data": response.json()
    }


# =============================
# ✅ Verificar conexión con GetStream
# =============================
@routes.get("/getstream/verify_connection")
async def verify_connection():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("https://video.stream-io-api.com/api/v1/")
        if response.status_code == 200:
            return {"message": "Conexión con GetStream verificada exitosamente"}
        else:
            raise HTTPException(status_code=response.status_code, detail="Error en conexión con GetStream")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =============================
# 🔎 Verificar acceso de usuario a una llamada
# =============================
@routes.get("/getstream/verify_user_access/{user_id}/{call_id}")
async def verify_user_access(user_id: str, call_id: str):
    """
    Solo verifica si el usuario tiene token válido y la llamada existe.
    """
    token = generate_stream_token(user_id)
    headers = {
        "Authorization": token,
        "stream-auth-type": "jwt",
    }

    url = f"https://video.stream-io-api.com/api/v1/call/default/{call_id}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="No autorizado o llamada no encontrada")

    return {
        "message": "Usuario autorizado para unirse a la videollamada",
        "user_id": user_id,
        "call_id": call_id,
        "data": response.json()
    }
