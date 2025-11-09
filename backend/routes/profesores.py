from config import SessionLocal
from model.models import Cursos, Usuarios
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
async def deactivate_course(course_id: int):
    return None

# Calendario de conferencias
@router.get("/calendar/{professor_id}")
async def get_calendar(professor_id: int):
    return None


# Endpoint solo para pruebas
@router.get("/all_courses", response_model=list[CursoResponse])
async def get_all(db: Session = Depends(get_db)):
    return db.query(Cursos).all()
