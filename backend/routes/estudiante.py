from config import SessionLocal
from fastapi import APIRouter, Depends, HTTPException
from model.models import Inscritos_Curso, Cursos, Usuarios, Sesiones_Virtuales
from sqlalchemy.orm import Session
from services.jwt import verify_token

router = APIRouter(prefix="/students", tags=["Student"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Obtener los cursos inscritos de un estudiante (activos e inactivos)
@router.get("/courses/active/{student_id}")
async def get_active_courses(student_id: int, current_user: Usuarios = Depends(verify_token), db: Session = Depends(get_db)):
    if current_user.role_name != "Estudiante":
        raise HTTPException(status_code=403, detail="Acceso denegado")
    
    inscritos = db.query(Inscritos_Curso).filter(Inscritos_Curso.id_estudiante == student_id).all()
    if not inscritos:
        raise HTTPException(status_code=404, detail="No se encontraron cursos inscritos")
    
    cursos = []
    for inscrito in inscritos:
        curso = db.query(Cursos).filter(Cursos.id == inscrito.id_curso).first()
        cursos.append(curso)
    
    return cursos

# Obtener los detalles de un curso
@router.get("/courses/details/{course_id}")
async def get_course_details(course_id: int, current_user: Usuarios = Depends(verify_token), db: Session = Depends(get_db)):
    if current_user.role_name != "Estudiante":
        raise HTTPException(status_code=403, detail="Acceso denegado")

    # Obtener los detalles del curso    
    curso = db.query(Cursos).filter(Cursos.id == course_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    
    # Obtener los estudiantes inscritos si los hay
    inscritos = db.query(Inscritos_Curso).filter(Inscritos_Curso.id_curso == course_id).all()
    if not inscritos:
        raise HTTPException(status_code=404, detail="No se encontraron estudiantes inscritos")

    # Obtener el profesor del curso
    profesor = db.query(Usuarios).filter(Usuarios.id == curso.profesor_id).first()
    if not profesor:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    
    return {"curso": curso, "estudiantes": inscritos, "profesor": profesor}

# Inscribirse en un curso (con código de curso)
@router.post("/courses/enroll")
async def enroll_in_course(course_code: str, student_id: int, current_user: Usuarios = Depends(verify_token), db: Session = Depends(get_db)):
    if current_user.role_name != "Estudiante":
        raise HTTPException(status_code=403, detail="Acceso denegado")

    # Verificar si el estudiante ya está inscrito en el curso
    inscripcion_existente = db.query(Inscritos_Curso).filter(
        Inscritos_Curso.id_curso == course_code,
        Inscritos_Curso.id_estudiante == student_id
    ).first()
    if inscripcion_existente:
        raise HTTPException(status_code=400, detail="Ya estás inscrito en este curso")

    # Verificar si el curso existe
    curso = db.query(Cursos).filter(Cursos.id == course_code).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso no encontrado")

    # Verificar si el estudiante está inscrito en otro curso
    inscripcion_existente = db.query(Inscritos_Curso).filter(
        Inscritos_Curso.id_estudiante == student_id
    ).first()
    
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
async def get_calendar(student_id: int, current=Depends(verify_token), db: Session = Depends(get_db)):
    if current.role_name != "Estudiante":
        raise HTTPException(status_code=403, detail="Acceso denegado")

    inscripciones = db.query(Inscritos_Curso).filter(
        Inscritos_Curso.id_estudiante == student_id,
        Inscritos_Curso.estado_invitacion == "Aceptada"
    ).all()

    if not inscripciones:
        raise HTTPException(status_code=404, detail="No está inscrito en ningún curso")

    # Obtener IDs de los cursos
    cursos_ids = [i.id_curso for i in inscripciones]

    # Buscar todas las sesiones virtuales de esos cursos
    sesiones = db.query(Sesiones_Virtuales).filter(
        Sesiones_Virtuales.id_curso.in_(cursos_ids)
    ).order_by(Sesiones_Virtuales.hora_inicio.asc()).all()

    if not sesiones:
        return {"message": "No hay sesiones programadas"}

    calendario = []
    for sesion in sesiones:
        curso = db.query(Cursos).filter(Cursos.id == sesion.id_curso).first()
        profesor = db.query(Usuarios).filter(Usuarios.id == curso.profesor_id).first()

        calendario.append({
            "curso": curso.titulo,
            "sesion": sesion.titulo,
            "descripcion": sesion.descripcion,
            "hora_inicio": sesion.hora_inicio,
            "hora_fin": sesion.hora_fin,
            "enlace_llamada": sesion.enlace_llamada,
            "profesor": f"{profesor.nombre} {profesor.apellido}",
        })

    return {"calendario": calendario, "total": len(calendario)}