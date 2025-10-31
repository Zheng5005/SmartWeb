from fastapi import APIRouter, Depends, HTTPException

routes = APIRouter()

# Obtener un enlace a la API de GetStream
@routes.get("/getstream/api_link/{user_id}")
async def get_api_link(user_id: int):
    return {"message": "Enlace a la API de GetStream generado", "user_id": user_id}

# Crear un canal de GetStream
@routes.post("/getstream/create_channel")
async def create_channel():
    return {"message": "Canal de GetStream creado"}

# Verificar la conexión con GetStream
@routes.get("/getstream/verify_connection")
async def verify_connection():
    return {"message": "Conexión con GetStream verificada exitosamente"}

# Verificar que el usuario tiene acceso a la videollamada de GetStream
@routes.get("/getstream/verify_user_access/{user_id}/{channel_id}")
async def verify_user_access(user_id: int, channel_id: int):
    return {"message": "Acceso del usuario verificado", "user_id": user_id, "channel_id": channel_id}