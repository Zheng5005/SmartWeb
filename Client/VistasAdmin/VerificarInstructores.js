// Client/Homes/VerificarInstructores.js

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CARGA DE INCLUDES (Rutas fijadas a '../../')
    if (typeof includeHTML === 'function') {
        includeHTML('navbar-placeholder', '../includes/html/admin_navbar.html');
        includeHTML('footer-placeholder', '../includes/html/footer.html');
    } else {
        console.error("ERROR JS: La función includeHTML no se ha cargado.");
    }
    
    // 2. LÓGICA DEL MODAL (Actualizada para leer Fecha y Especialidad)
    document.querySelectorAll('.btn-ver-detalle').forEach(button => {
        button.addEventListener('click', function() {
            // Recolectar datos básicos
            const row = this.closest('tr');
            const nombre = row.querySelector('.instructor-name').textContent; 
            const email = row.querySelector('.instructor-email').textContent;
            
            // Recolectar datos de los atributos del botón
            const motivacion = this.getAttribute('data-motivacion'); 
            const fecha = this.getAttribute('data-fecha');         
            const especialidad = this.getAttribute('data-especialidad'); 

            // Insertar datos en el Modal
            document.getElementById('modalInstructorName').textContent = nombre;
            document.getElementById('modalInstructorEmail').textContent = email;
            
            // Insertar nuevos datos
            document.getElementById('modalFechaSolicitud').textContent = fecha;
            document.getElementById('modalEspecialidad').textContent = especialidad;
            
            document.getElementById('modalInstructorMotivacion').textContent = motivacion;

            // Mostrar el modal de Bootstrap
            try {
                const detalleModal = new bootstrap.Modal(document.getElementById('instructorDetalleModal'));
                detalleModal.show();
            } catch (e) {
                console.error("ERROR JS: Fallo al iniciar el modal. Asegúrate de que Bootstrap JS esté cargado.");
            }
        });
    });

    // 3. LÓGICA DE BOTONES ACEPTAR/RECHAZAR 
    document.querySelectorAll('.btn-success').forEach(btn => {
        btn.addEventListener('click', () => {
             const instructor = btn.closest('tr').querySelector('.instructor-name').textContent;
             alert(`Aceptando a ${instructor}. (Lógica de backend pendiente)`);
        });
    });
    
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', () => {
             const instructor = btn.closest('tr').querySelector('.instructor-name').textContent;
             alert(`Rechazando a ${instructor}. (Lógica de backend pendiente)`);
        });
    });
});