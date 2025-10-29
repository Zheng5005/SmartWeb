from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

# Base de datos SQLite como ejemplo de configuración
DATABASE_URL = os.getenv("DATABASE_URL", None)

# Secreto de usuario
SECRET_KEY = os.getenv("SECRET_KEY", None)

# Configuración de SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

Base.metadata.create_all(bind=engine)