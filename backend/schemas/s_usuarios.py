from pydantic import BaseModel, EmailStr
from datetime import datetime

class UsuarioCreate(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr
    password: str

class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: str
    role: str
    creacion_cuenta: datetime

    class Config:
        orm_mode = True

