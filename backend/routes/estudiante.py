from fastapi import APIRouter, Depends, HTTPException

routes = APIRouter()

# Obtener los cursos inscritos de un estudiante (activos e inactivos)
@routes.get("/courses/active/{student_id}")
async def get_active_courses(student_id: int):
    return None

# Obtener los detalles de un curso
@routes.get("/courses/details/{course_id}")
async def get_course_details(course_id: int):
    return None

# Inscribirse en un curso (con código de curso)
@routes.post("/courses/enroll")
async def enroll_in_course(course_code: str, student_id: int):
    return None

# Ver el calendario de conferencias
@routes.get("/calendar/student/{student_id}")
async def get_calendar(student_id: int):
    return None