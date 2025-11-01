# crear entorno virtual
python -m venv env
#python3 -m venv env # Linux

# activar entorno virtual
source env/Scripts/activate
source env/bin/activate # Linux

# instalar dependencias
pip install -r requirements.txt
# ejecutar la aplicación
uvicorn main:app --reload
