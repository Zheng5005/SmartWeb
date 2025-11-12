from functools import cached_property
from os import name
from fastapi import APIRouter, Depends, HTTPException
from model.models import CalidadVideo, Inscritos_Curso, Participantes_Sesion_V, Roles, Sesiones_Virtuales, Usuarios
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

class CallCreate(BaseModel):
    curso_id: int
    titulo: str
    descripcion: str
    hora_inicio: datetime
    hora_fin: datetime
    origen: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/createCall")
async def create_call(Info: CallCreate, current=Depends(verify_token), db:Session = Depends(get_db)):
    integrantes = db.query(Inscritos_Curso).filter(
        Inscritos_Curso.id_curso == Info.curso_id,
        Inscritos_Curso.estado_invitacion == "Aceptada"
    ).all()

    members = [{"user_id": str(current.id), "role": "admin"}]
    for ins in integrantes:
        members.append({"user_id": str(ins.id_estudiante), "role": "user"})

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

    new_session=Sesiones_Virtuales(
        id_curso=Info.curso_id,
        titulo=Info.titulo,
        descripcion=Info.descripcion,
        hora_inicio=Info.hora_inicio,
        hora_fin=Info.hora_fin,
        enlace_llamada=f"{Info.origen}/call/{enlace}/{Info.curso_id}",
        calidad_video=CalidadVideo.p4K,
        grabacion_url=Info.origen,
    )

    db.add(new_session)
    db.commit()
    db.refresh(new_session)  # 👈 Esto actualiza el objeto con los datos reales en DB

    return {
        "message": "Sesion creada",
        "enlace_llamada": new_session.enlace_llamada,
        "curso_id": new_session.id_curso,
        "total_miembro": len(members),
        "miembros": members
    }

@router.post("/joinCall")
async def join_call(curso_id: int, current=Depends(verify_token), db:Session = Depends(get_db)):
    miembro = db.query(Inscritos_Curso).filter(
        Inscritos_Curso.id_curso == curso_id,
        Inscritos_Curso.id_estudiante == current.id
    ).first()

    profesor = (
        db.query(Usuarios)
        .join(Roles)
        .filter(Usuarios.id == current.id, Roles.nombre_rol == "Profesor")
        .first()
    )

    if not miembro and not profesor:
        raise HTTPException(status_code=403, detail="No perteneces a este curso")

     # Crear el token de GetStream
    client.upsert_users(UserRequest(id=str(current.id), name=f"{current.nombre} {current.apellido}"))
    user_token = client.create_token(user_id=str(current.id))

    return {
        "authorized": True,
        "getStreamToken": user_token
    }
