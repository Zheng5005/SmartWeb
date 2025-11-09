from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from uuid import uuid4
from config import SessionLocal
from model.models import (
    Usuarios, Cursos, Sesiones_Virtuales, Inscritos_Curso, Participantes_Sesion_V,
    RoleLlamada, CalidadVideo
)
from services.jwt import verify_token

router = APIRouter(prefix="/videollamadas", tags=["Videollamadas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.post("/crear/{curso_id}")
async def crear_llamada(
    curso_id: int,
    data: dict,
    current=Depends(verify_token),
    db: Session = Depends(get_db)
):
    """El profesor crea una nueva sesión de videollamada asociada a un curso."""
    user = db.query(Usuarios).filter(Usuarios.id == current.id).first()
    curso = db.query(Cursos).filter(Cursos.id == curso_id).first()

    if not curso:
        raise HTTPException(status_code=404, detail="Curso no encontrado")

    if curso.profesor_id != user.id:
        raise HTTPException(status_code=403, detail="No eres el profesor de este curso")

    # Crear sesión virtual
    enlace = str(uuid4())[:8]
    nueva_sesion = Sesiones_Virtuales(
        id_curso=curso.id,
        titulo=data.get("titulo", "Reunión de clase"),
        descripcion=data.get("descripcion", ""),
        hora_inicio=datetime.utcnow(),
        enlace_llamada=enlace,
        calidad_video=CalidadVideo.p720,
    )

    db.add(nueva_sesion)
    db.commit()
    db.refresh(nueva_sesion)

    return {
        "message": "Sesión creada correctamente",
        "enlace_llamada": enlace,
        "curso_id": curso.id,
        "sesion_id": nueva_sesion.id_sesion
    }

@router.get("/join/{enlace_llamada}")
async def unirse_llamada(
    enlace_llamada: str,
    current=Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Permite a un usuario unirse si pertenece al curso de la llamada."""
    sesion = db.query(Sesiones_Virtuales).filter(
        Sesiones_Virtuales.enlace_llamada == enlace_llamada
    ).first()

    if not sesion:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")

    curso = db.query(Cursos).filter(Cursos.id == sesion.id_curso).first()

    # Validar si es el profesor
    if curso.profesor_id == current.id:
        rol_llamada = RoleLlamada.HOST
    else:
        # Verificar si está inscrito
        inscripcion = db.query(Inscritos_Curso).filter(
            Inscritos_Curso.id_curso == curso.id,
            Inscritos_Curso.id_estudiante == current.id,
            Inscritos_Curso.estado_invitacion == "Aceptada"
        ).first()
        if not inscripcion:
            raise HTTPException(status_code=403, detail="No estás inscrito en este curso")

        rol_llamada = RoleLlamada.PARTICIPANTE

    # Registrar unión
    participante = Participantes_Sesion_V(
        id_sesion=sesion.id_sesion,
        id_usuario=current.id,
        hora_unido=datetime.utcnow(),
        role_llamada=rol_llamada
    )
    db.add(participante)
    db.commit()

    # Token temporal (simple ejemplo)
    token_acceso = str(uuid4())

    return {
        "room_id": enlace_llamada,
        "sesion_id": sesion.id_sesion,
        "rol": rol_llamada.value,
        "token_acceso": token_acceso
    }