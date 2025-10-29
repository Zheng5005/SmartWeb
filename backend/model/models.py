from config import Base
from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

class EstadoUsuario(enum.Enum):
    Activo = "Activo"
    Inactivo = "Inactivo"

class Roles(Base):
    __tablename__ = "Roles"
    id = Column(Integer, primary_key=True, index=True)
    nombre_rol = Column(String, unique=True, nullable=False)

class Usuarios(Base):
    __tablename__ = "Usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    apellido = Column(String)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String)
    role = Column(Integer, ForeignKey("Roles.id"), nullable=False)
    creacion_cuenta = Column(DateTime(timezone=True), server_default=func.now())
    ultimo_login = Column(DateTime(timezone=True))
    status = Column(Enum(EstadoUsuario), default=EstadoUsuario.Activo)

    rol = relationship("Roles")

