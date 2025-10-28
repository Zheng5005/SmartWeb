# crear entorno virtual
python -m venv env
# activar entorno virtual
source env/Scripts/activate # Windows
# instalar dependencias
pip install -r requirements.txt
# ejecutar la aplicación
uvicorn main:app --reload