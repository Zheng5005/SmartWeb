document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const registerButton = document.getElementById("registerButton");

  registerButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Capturar los datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Validación simple
    if (!nombre || !apellido || !email || !password) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Determinar el rol
    const role = userType === "teacher" ? "Profesor" : "Estudiante";

    // Si es profesor, capturar motivación
    let motivation = "";
    if (userType === "teacher") {
      motivation = document.getElementById("motivation").value.trim();
      if (!motivation) {
        alert("Por favor, explique su motivación para ser profesor.");
        return;
      }
    }

    // Construir el cuerpo de la solicitud
    const data = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      role: role,
      motivacion: motivation || null
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      // Leer respuesta del backend
      const result = await response.json();

      if (!response.ok) {
        alert(`Error: ${result.detail || "No se pudo registrar"}`);
        return;
      }

      // Mostrar mensaje según tipo de usuario
      if (role === "Estudiante") {
        alert("Registro exitoso. Revisa tu correo para activar tu cuenta.");
      } else if (role === "Profesor") {
        alert("Registro exitoso. Tu solicitud será revisada por un administrador.");
      }

      // Redirigir al login
      window.location.href = "../login/login.html";

    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Ocurrió un error al conectar con el servidor.");
    }
  });
});

