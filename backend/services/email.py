from fastapi import HTTPException
import smtplib
from email.mime.text import MIMEText

def send_email(to, subject, body):
    msg = MIMEText(body, "plain")
    msg["Subject"] = subject
    msg["From"] = "noreply@tu_dominio.com"
    msg["To"] = to

    with smtplib.SMTP("smtp.tu_dominio.com", 587) as server:
        server.starttls()
        server.login("usuario_smtp", "contraseña")
        server.send_message(msg)