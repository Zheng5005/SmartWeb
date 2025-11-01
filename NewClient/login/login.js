document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    loginButton.disabled = true;
    loginButton.textContent = "Entrando...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión.");
      }

      // Guardar token si viene en la respuesta
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      console.log(response)

      // Verificar rol del usuario
      const role = data.user?.role?.toLowerCase();

      if (!role) {
        alert("No se pudo determinar el rol del usuario.");
        return;
      }

      alert(`Inicio de sesión exitoso como ${role} ✅`);

      // Redirección según el rol
      switch (role) {
        //case "Administrador":
        case 2:
          window.location.href = "HomeAdmin.html";
          break;
        case "Profesor":
          window.location.href = "HomeTeacher.html";
          break;
        //case "Estudiante":
        case 4:
          window.location.href = "HomeStudent.html";
          break;
        default:
          window.location.href = "dashboard.html";
          break;
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Error al conectar con el servidor.");
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = "entrar";
    }
  });
});

