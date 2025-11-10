from config import SessionLocal
from model.models import Cursos, Usuarios, Sesiones_Virtuales, Participantes_Sesion_V
from schemas.s_cursos import CursoCreate, CursoResponse
from services.jwt import verify_token
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(tags=["Profesor"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Obtener los cursos de un profesor (activos e inactivos)
@router.get("/courses/active/")
async def get_active_courses(current=Depends(verify_token), db: Session = Depends(get_db)):
    if current.role_name != "Profesor":
        raise HTTPException(status_code=403, detail="Acceso denegado")

    return db.query(Cursos).filter(Cursos.profesor_id == current.id).all()

# Obtener la cantidad de cursos activos de 1 profesor
@router.get("/courses/active/number")
async def get_active_courses_number(current=Depends(verify_token), db: Session = Depends(get_db)):
    if current.role_name != "Profesor":
        raise HTTPException(status_code=403, detail="Acceso denegado")

    courses_count = db.query(Cursos).filter(Cursos.profesor_id == current.id).all()

    return len(courses_count)

# Crear curso
@router.post("/create/course")
async def create_course(course: CursoCreate, current_user: Usuarios = Depends(verify_token), db: Session = Depends(get_db)):
    if current_user.role_name != "Profesor":
        raise HTTPException(status_code=403, detail="No tienes los permisos requeridos")

    existing_course = db.query(Cursos).filter(
        (Cursos.profesor_id == current_user.id) & (Cursos.titulo == course.titulo)
    ).first()
    if existing_course:
        raise HTTPException(status_code=400, detail="No se puede repetir nombre de curso")

    new_course = Cursos(
        titulo=course.titulo,
        descripcion=course.descripcion,
        profesor_id=current_user.id,
    )
    db.add(new_course)
    db.commit()

    return {"message": "Curso creado exitosamente"}

# Desactivar curso
@router.put("/deactivate/course/{course_id}")
async def deactivate_course(course_id: int, current_user: Usuarios = Depends(verify_token), db: Session = Depends(get_db)):
    if current_user.role_name != "Profesor":
        raise HTTPException(status_code=403, detail="Acceso denegado")
    
    course = db.query(Cursos).filter(Cursos.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    
    course.estado_curso = "Inactivo"
    db.commit()
    
    return {"message": "Curso desactivado exitosamente"}

# Calendario de conferencias
@router.get("/calendar/{professor_id}")
async def get_calendar(professor_id: int, current=Depends(verify_token), db: Session = Depends(get_db)):
    if current.role_name != "Profesor":
        raise HTTPException(status_code=403, detail="Acceso denegado")

    # Verificar que el profesor logueado sea el mismo del parámetro
    if current.id != professor_id:
        raise HTTPException(status_code=403, detail="No puedes ver el calendario de otro profesor")

    # Obtener los cursos dictados por el profesor
    cursos = db.query(Cursos).filter(Cursos.profesor_id == professor_id).all()
    if not cursos:
        raise HTTPException(status_code=404, detail="No tienes cursos asignados")

    cursos_ids = [c.id for c in cursos]

    # Buscar todas las sesiones virtuales asociadas a esos cursos
    sesiones = db.query(Sesiones_Virtuales).filter(
        Sesiones_Virtuales.id_curso.in_(cursos_ids)
    ).order_by(Sesiones_Virtuales.hora_inicio.asc()).all()

    if not sesiones:
        return {"message": "No hay sesiones programadas"}

    calendario = []
    for sesion in sesiones:
        # Contar participantes (si existen)
        participantes_count = db.query(Participantes_Sesion_V).filter(
            Participantes_Sesion_V.id_sesion == sesion.id_sesion
        ).count()

        # Buscar título del curso
        curso = db.query(Cursos).filter(Cursos.id == sesion.id_curso).first()

        calendario.append({
            "curso": curso.titulo,
            "sesion": sesion.titulo,
            "descripcion": sesion.descripcion,
            "hora_inicio": sesion.hora_inicio,
            "hora_fin": sesion.hora_fin,
            "enlace_llamada": sesion.enlace_llamada,
            "calidad_video": sesion.calidad_video.value if sesion.calidad_video else None,
            "participantes": participantes_count
        })

    return {"profesor": current.nombre, "total_sesiones": len(calendario), "calendario": calendario}

# Endpoint solo para pruebas
@router.get("/all_courses", response_model=list[CursoResponse])
async def get_all(db: Session = Depends(get_db)):
    return db.query(Cursos).all()
