function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
}

function checkAccess(allowedRoles = []) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "../index.html";
    return false;
  }

  const user = decodeJWT(token);

  if (!user || !user.role) {
    alert("Token inválido");
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
    return false;
  }

  if (user.exp && Date.now() >= user.exp * 1000) {
    alert("Sesión expirada");
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
    return false;
  }

  if (!allowedRoles.includes(user.role)) {
    alert("No tienes permiso para acceder aquí");
    window.history.back();
    return false;
  }

  window.currentUser = user;
  return true;
}

const API_URL = "http://localhost:8000";

async function verifyAuth(allowedRoles = []) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No se encontró token en localStorage.");
    redirectToLogin();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.warn("Token no válido o expirado.");
      redirectToLogin();
      return;
    }

    const data = await response.json();
    const userRole = data.rol;

    // Guarda el rol en localStorage por si se necesita
    localStorage.setItem("user_role", userRole);

    // Si hay roles permitidos y el usuario no tiene uno de ellos → redirigir
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      alert("No tienes permisos para acceder a esta página.");
      redirectByRole(userRole);
    }

  } catch (error) {
    console.error("Error verificando el token:", error);
    redirectToLogin();
  }
}

// 🚪 Cierra sesión globalmente
async function logout() {
  const token = localStorage.getItem("token");

  if (!token) {
    redirectToLogin();
    return;
  }

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error cerrando sesión:", error);
  }

  localStorage.clear();
  redirectToLogin();
}

// 🌐 Redirecciones útiles
function redirectToLogin() {
  window.location.href = "../login/login.html";
}

function redirectByRole(role) {
  switch (role) {
    case "Administrador":
      window.location.href = "../Homes/HomeAdmin.html";
      break;
    case "Profesor":
      window.location.href = "../Homes/HomeTeacher.html";
      break;
    case "Estudiante":
      window.location.href = "../Homes/HomeStudent.html";
      break;
    default:
      redirectToLogin();
  }
}

// ✅ Hacer accesible logout desde HTML (para onclick)
window.logout = logout;
window.verifyAuth = verifyAuth;