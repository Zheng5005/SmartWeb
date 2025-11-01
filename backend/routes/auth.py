from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from model.models import Usuarios, AuthToken, Roles
from services.cifrar import hash_password
from schemas.s_usuarios import UsuarioLogin, UsuarioCreate
from services.cifrar import verify_password
from config import SessionLocal
from services.jwt import create_access_token, verify_token

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
    default_role = db.query(Roles).filter(Roles.nombre_rol == "Estudiante").first()
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

# Login manual
@router.post("/login")
async def login_user(user_data: UsuarioLogin, db: Session = Depends(get_db)):
    user = db.query(Usuarios).filter(Usuarios.email == user_data.email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    if not verify_password(user_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    # Control de múltiples sesiones
    existing_token = db.query(AuthToken).filter(
        AuthToken.user_id == user.id,
        AuthToken.revocado == False
    ).first()

    if existing_token:
        raise HTTPException(status_code=403, detail="Ya hay una sesión activa")

    role = db.query(Roles).filter(Roles.id == user.role).first()
    if not role:
        raise HTTPException(status_code=500, detail="Rol del usuario no encontrado")

    # Generar token JWT
    access_token = create_access_token({"sub": str(user.id)})

    # Guardar token en la base de datos
    expiracion = datetime.utcnow() + timedelta(hours=2)
    new_token = AuthToken(
        user_id=user.id,
        jwt_token=access_token,
        expiracion=expiracion,
        revocado=False,
    )
    db.add(new_token)

    # Marcar usuario como activo
    user.status = "Activo"
    db.commit()

    return {"access_token": access_token, "token_type": "bearer", "role": role.nombre_rol}

@router.post("/logout")
async def logout_user(current_user: Usuarios = Depends(verify_token), db: Session = Depends(get_db)):
    # Buscar el token activo del usuario
    token = db.query(AuthToken).filter(
        AuthToken.user_id == current_user.id,
        AuthToken.revocado == False
    ).first()

    if not token:
        raise HTTPException(status_code=400, detail="No hay sesión activa")

    # Revocar token
    token.revocado = True

    # Marcar usuario como inactivo
    current_user.status = "Inactivo"
    db.commit()

    return {"message": "Sesión cerrada correctamente"}
