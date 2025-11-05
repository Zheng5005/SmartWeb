// Client/Homes/HomeAdmin.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Carga de Includes (Usando la función del archivo ../js/html_includes.js)
    // Asegúrate de que el script ../js/html_includes.js se cargue primero en el HTML.
    
    // Las rutas son relativas a HomeAdmin.html (que está en Homes/)
    if (typeof includeHTML === 'function') {
        includeHTML('navbar-placeholder', '../includes/html/admin_navbar.html');
        includeHTML('footer-placeholder', '../includes/html/footer.html');
    } else {
        console.error("El archivo ../js/html_includes.js o la función includeHTML no se ha cargado correctamente.");
    }

    // 2. Lógica Específica del Administrador (Ejemplo: Inicialización de eventos)
    
    const botonRevisarInstructores = document.querySelector('.btn-admin[href="#revisar-instructores"]');
    if (botonRevisarInstructores) {
        botonRevisarInstructores.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navegando a la vista de Solicitudes de Instructores...');
            // Aquí iría la lógica para cargar dinámicamente la nueva vista o redirigir
            window.location.href = 'VerificarInstructores.html';
        });
    }

    // 3. Lógica para Abrir Modal (Si estuviera en esta misma página)
    
    document.querySelectorAll('.btn-ver-detalle').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const nombre = row.querySelector('.instructor-name').textContent;
            const email = row.querySelector('.instructor-email').textContent;
            const motivacion = this.getAttribute('data-motivacion'); 

            document.getElementById('modalInstructorName').textContent = nombre;
            document.getElementById('modalInstructorEmail').textContent = email;
            document.getElementById('modalInstructorMotivacion').textContent = motivacion;

            // Inicializa y muestra el modal de Bootstrap
            const detalleModal = new bootstrap.Modal(document.getElementById('instructorDetalleModal'));
            detalleModal.show();
        });
    });
});