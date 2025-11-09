from config import SessionLocal
from fastapi import APIRouter, Depends, HTTPException
from model.models import Inscritos_Curso
from sqlalchemy.orm import Session

router = APIRouter(prefix="/stu", tags=["Student"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Obtener los cursos inscritos de un estudiante (activos e inactivos)
@router.get("/courses/active/{student_id}")
async def get_active_courses(student_id: int):
    return None

# Obtener los detalles de un curso
@router.get("/courses/details/{course_id}")
async def get_course_details(course_id: int):
    return None

# Inscribirse en un curso (con código de curso)
@router.post("/courses/enroll")
async def enroll_in_course(course_code: str, student_id: int, db: Session = Depends(get_db)):
    nueva_inscripcion = Inscritos_Curso(
        id_curso=course_code,
        id_estudiante=student_id,
        estado_invitacion="Aceptada",
        enlace_unico="1223009" 
    )
    
    db.add(nueva_inscripcion)
    db.commit()
    db.refresh(nueva_inscripcion)

    return {"message": "Registro exitoso. Verifique su correo si aplica."}

# Ver el calendario de conferencias
@router.get("/calendar/student/{student_id}")
async def get_calendar(student_id: int):
    return None
