from config import SessionLocal
from fastapi import APIRouter, Depends, HTTPException
from model.models import Roles, Usuarios
from schemas.s_usuarios import UsuarioCreate, UsuarioLogin
from services.cifrar import hash_password, verify_password
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
async def register_user(user: UsuarioCreate, db: Session = Depends(get_db)):
    # Verificar si el email ya existe
    existing_user = db.query(Usuarios).filter(Usuarios.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    # Obtener rol por defecto
    default_role = db.query(Roles).filter(Roles.nombre_rol == "ESTUDIANTE").first()
    if not default_role:
        raise HTTPException(status_code=500, detail="Rol por defecto 'ESTUDIANTE' no encontrado")

    # Hashear contraseña
    hashed_password = hash_password(user.password)

    # Crear Usuario
    nuevo_usuario = Usuarios(
        nombre=user.nombre,
        apellido=user.apellido,
        email=user.email,
        password_hash=hashed_password,
        role=default_role.id
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {"message": "Usuario creado exitosamente"}

##Login manual
@router.post("/login")
async def login_user(user_data: UsuarioLogin, db: Session = Depends(get_db())):
    user = db.query(Usuarios).filter(Usuarios.email ).first()

    # Verificar si el usuario existe
    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    # Verificar la contraseña
    if not verify_password(user_data.user_password, user.user_password):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

     # Generar el token JWT

    return {"token": "token"}
