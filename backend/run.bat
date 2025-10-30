@echo off
for /f "tokens=2 delims==" %%i in ('wmic os get caption /value 2^>nul') do set OSNAME=%%i
echo Sistema detectado: %OSNAME%

if /i "%OSNAME%"=="Microsoft Windows" (
    echo Ejecutando en Windows...
    if not exist env (
        python -m venv env
    )
    call env\Scripts\activate
) else (
    echo Ejecutando en Linux/WSL...
    if not exist env (
        python3 -m venv env
    )
    call env/bin/activate
)

if exist requirements.txt (
    echo Instalando dependencias...
    pip install -r requirements.txt
)

echo Iniciando servidor...
uvicorn main:app --reload
pause
