
from os import name
from fastapi import APIRouter, Depends, HTTPException
from model.models import Inscritos_Curso, Usuarios
from pydantic import BaseModel
from getstream import Stream
from getstream.models import UserRequest
from getstream.models import CallRequest
from config import STREAM_API_KEY, STREAM_API_SECRET, STREAM_BASE_URL, SessionLocal
from datetime import datetime
import uuid
from sqlalchemy.orm import Session

from services.jwt import verify_token

router = APIRouter(prefix="/hope", tags=["hope"])

client = Stream(api_key=STREAM_API_KEY, api_secret=STREAM_API_SECRET)

# Modelos Pydantic
class CreateCallRequest(BaseModel):
    user_id: str

class JoinCallRequest(BaseModel):
    user_id: str
    call_id: str

active_calls = {}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/createtoken")
async def create_token(current=Depends(verify_token), db: Session = Depends(get_db)):
    rol = ""
    user = db.query(Usuarios).filter(Usuarios.id == current.id).first()

    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    print(f"Creando llamada para usuario: {user.id}")
        
    if user.rol == "Profesor":
        rol = "admin"
    else:
        rol = "guest"
    # Crear usuario en GetStream
    client.upsert_users(UserRequest(id=str(user.id), name=f"{user.nombre} {user.apellido}", role=rol))

    # ✅ USAR EL MÉTODO OFICIAL DEL SDK PARA GENERAR TOKENS
    user_token = client.create_token(user_id=str(user.id))
    print(f"Token generado por SDK: {user_token[:50]}...")

    return {"getStreamToken": user_token}

@router.post("/createCall")
async def create_call(curso_id: int, data:dict, current=Depends(verify_token), db:Session = Depends(get_db)):
    integrantes = db.query(Inscritos_Curso).filter(
        Inscritos_Curso.id_curso == curso_id,
        Inscritos_Curso.estado_invitacion == "Aceptada"
    ).all()

    members = [{"user_id": str(current.id), "role": "admin"}]
    for ins in integrantes:
        members.append({"user_id": str(ins.id_estudiante), "role": "guest"})

    # Registrar usuarios en GetStream
    for m in members:
        db_user = db.query(Usuarios).filter(Usuarios.id == int(m["user_id"])).first()
        if db_user:
            client.upsert_users(UserRequest(id=str(db_user.id), name=f"{db_user.nombre} {db_user.apellido}"))

    enlace = uuid.uuid4()

    call = client.video.call("default", enlace)
    call.create(
        data=CallRequest(
            created_by_id=str(current.id),
            members=members
        )
    )

    return {
        "message": "Sesion creada",
        "enlace_llamada": enlace,
        "curso_id": curso_id,
        "total_miembro": len(members),
        "miembros": members
    }
