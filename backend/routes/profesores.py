from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

# Obtener los cursos de un profesor (activos e inactivos)
@router.get("/courses/active/{professor_id}")
async def get_active_courses(professor_id: int):
    return None

# Crear curso
@router.post("/create/course")
async def create_course():
    return None

# Desactivar curso
@router.put("/deactivate/course/{course_id}")
async def deactivate_course(course_id: int):
    return None

# Calendario de conferencias
@router.get("/calendar/{professor_id}")
async def get_calendar(professor_id: int):
    return None

# Crear enlace para conferencia
@router.post("/create/conference/link")
async def create_conference_link():
    return None