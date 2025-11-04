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
