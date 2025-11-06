// Client/js/logout.js

const LOGOUT_URL = 'http://127.0.0.1:8000/auth/logout';

/**
 * Cierra la sesión del usuario enviando el token al backend y limpiando el localStorage.
 */
async function logout() {
    // 1. Obtener el token del localStorage
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
        console.warn("No se encontró token JWT. Limpiando localStorage de todos modos.");
        // Si no hay token, simplemente forzamos la limpieza y redirigimos
        clearLocalSession();
        return;
    }

    try {
        // 2. Realizar la petición POST al endpoint de logout
        const response = await fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Enviar el token en el encabezado Authorization tipo Bearer
                'Authorization': `Bearer ${token}`
            }
        });

        // 3. Manejar la respuesta del servidor
        if (response.ok) {
            console.log("Sesión cerrada exitosamente en el servidor.");
        } else if (response.status === 401) {
            // El token es inválido/expirado, pero el objetivo se logró (la sesión terminó)
            console.warn("El servidor reportó un error 401 (Token inválido/expirado). Procediendo a cerrar la sesión local.");
        } else {
            // Error general del servidor
            console.error("Error al cerrar sesión en el servidor:", response.status, await response.text());
        }

    } catch (error) {
        console.error("Error de red durante el cierre de sesión:", error);
        // Podrías mostrar un mensaje de error, pero la prioridad sigue siendo cerrar la sesión local
    } finally {
        // 4. Limpiar la sesión local y redirigir (Se hace SIEMPRE, independientemente de la respuesta del servidor)
        clearLocalSession();
    }
}

/**
 * Limpia el localStorage y redirige al usuario a la página de login.
 */
function clearLocalSession() {
    localStorage.removeItem('jwtToken'); // Eliminar el token
    localStorage.removeItem('userRole'); // (Opcional) Eliminar el rol
    
    // Redirigir a la página de login
    window.location.href = '/Client/login/login.html'; // Ajusta esta ruta si es necesario
}