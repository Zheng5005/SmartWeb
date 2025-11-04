// Client/Homes/GestionarUsuarios.js

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CARGA DE INCLUDES (Ajustada para Client/VistasAdmin/)
    if (typeof includeHTML === 'function') {
        includeHTML('navbar-placeholder', '../includes/html/admin_navbar.html');
        includeHTML('footer-placeholder', '../includes/html/footer.html');
    } else {
        console.error("ERROR JS: La función includeHTML no se ha cargado. Revisa la ruta.");
    }
    
    // 2. LÓGICA DEL MODAL DE RESETEO DE CONTRASEÑA
    const resetPasswordModal = document.getElementById('resetPasswordModal');
    
    // Captura los datos del usuario antes de abrir el modal
    resetPasswordModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Botón que disparó el modal
        const userName = button.getAttribute('data-user-name');
        const userId = button.getAttribute('data-user-id');

        // Inserta los datos en el modal
        document.getElementById('modalUserName').textContent = userName;
        document.getElementById('resetUserId').value = userId;
    });

    // Lógica al hacer clic en Confirmar Reseteo
    document.getElementById('confirmResetBtn').addEventListener('click', function() {
        const userId = document.getElementById('resetUserId').value;
        const userName = document.getElementById('modalUserName').textContent;

        console.log(`Intentando resetear contraseña para User ID: ${userId} (${userName})`);
        
        // ** Aquí iría la llamada AJAX/Fetch al backend para resetear la contraseña **
        // Ejemplo de respuesta simulada:
        alert(`Contraseña de ${userName} reseteada exitosamente. Se ha enviado una contraseña temporal a su correo.`);
        
        // Cerrar el modal después de la acción
        const modalInstance = bootstrap.Modal.getInstance(resetPasswordModal);
        modalInstance.hide();
    });
    
    // 3. LÓGICA DE FILTROS (Placeholder para funcionalidad avanzada)
    document.getElementById('filtroRol').addEventListener('change', function() {
        console.log(`Filtrando por rol: ${this.value}`);
        // Aquí iría la lógica para recargar la tabla con el filtro aplicado
    });
    
    document.getElementById('busqueda').addEventListener('keyup', function() {
        console.log(`Buscando: ${this.value}`);
        // Aquí iría la lógica para filtrar la tabla dinámicamente
    });
});