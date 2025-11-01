from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from config import SessionLocal, Base, engine
from routes import auth, ejemplo, getstreamFile
from model.models import Roles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexion a base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Insertar roles defaults si no existen
def seed_roles():
    db = SessionLocal(bind=engine)
    roles_default = ["Estudiante", "Profesor", "Administrador"]

    for rol in roles_default:
        existe = db.query(Roles).filter_by(nombre_rol=rol).first()
        if not existe:
            nuevo_rol = Roles(nombre_rol=rol)
            db.add(nuevo_rol)
    db.commit()
    db.close()

# Ejemplo basico de ruta
@app.get("/")
def read_root():
    return {"message": "API is running"}

# Importar rutas
app.include_router(ejemplo.router)
app.include_router(auth.router)
app.include_router(getstreamFile.router)

seed_roles()