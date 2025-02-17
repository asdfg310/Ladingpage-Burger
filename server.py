from flask import Flask, request, jsonify
from flask_cors import CORS  # Importar CORS para evitar errores de origen cruzado
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir peticiones desde el frontend

# Configuración del servidor SMTP
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "jtmr310@gmail.com"  # Asegúrate de usar un correo válido
SMTP_PASSWORD = "sjma lmhs ggdw dykj"  # Debe ser una "Contraseña de Aplicación" de Gmail

@app.route('/enviar_correo', methods=['POST'])
def enviar_correo():
    try:
        # 📌 Recibir datos correctamente según el formato enviado por fetch
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        mensaje = request.form.get('mensaje')

        if not nombre or not email or not mensaje:
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # 📩 Crear el mensaje de correo
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER  # Usar el correo configurado como remitente
        msg['To'] = "jtmr310@gmail.com"  # Destinatario
        msg['Subject'] = f"Nuevo mensaje de {nombre}"

        # ✉️ Contenido del mensaje
        body = f"Nombre: {nombre}\nCorreo: {email}\n\nMensaje:\n{mensaje}"
        msg.attach(MIMEText(body, 'plain'))

        # 🔗 Conectar con el servidor SMTP y enviar el correo
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Habilitar seguridad TLS
        server.login(SMTP_USER, SMTP_PASSWORD)  # Iniciar sesión en el servidor
        server.sendmail(SMTP_USER, "jtmr310@gmail.com", msg.as_string())  # Enviar correo
        server.quit()

        return jsonify({"message": "Correo enviado exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
