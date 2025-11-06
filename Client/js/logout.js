async function logout() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No hay sesión activa.");
        window.location.href = "../login/login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            console.warn("Error al cerrar sesión:", err);
            alert("No se pudo cerrar sesión correctamente en el servidor.");
            return;
        }

        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_name");

        alert("Sesión cerrada correctamente.");
        window.location.href = "../login/login.html";

    } catch (error) {
        console.error("Error en logout:", error);
        alert("Error de conexión. Intenta más tarde.");
    }
}

window.onload = function () {
    document.getElementById("logout").addEventListener("click", logout);
};
