// Client/Homes/HomeTeacher.js

document.addEventListener('DOMContentLoaded', function() {
    
    
    if (typeof includeHTML === 'function') {
        
        // Cargar Navbar de Docente
        // RUTA: Sube de Homes/ a Client/ y baja a includes/html/
        includeHTML('navbar-placeholder', '../includes/html/teacher_navbar.html');
        
        // Cargar Footer (reutilizando el fragmento existente)
        // RUTA: Sube de Homes/ a Client/ y baja a includes/html/
        includeHTML('footer-placeholder', '../includes/html/footer.html');
        
    } else {
        console.error("ERROR JS: La función includeHTML no se ha cargado.");
    }

    // LÓGICA ESPECÍFICA DEL HOME DOCENTE
    
    // Ejemplo: Alertas para los botones de acciones rápidas (usando los IDs que dejaste)
    document.getElementById('btnCrearCurso').addEventListener('click', function() {
        alert('Redirigiendo a la vista para Crear Nuevo Curso...');
        // Aquí iría window.location.href = '/Client/VistasTeacher/CrearCurso.html';
    });

    document.getElementById('btnProgramarSesion').addEventListener('click', function() {
        alert('Redirigiendo a la vista para Programar Sesión...');
        // Aquí iría window.location.href = '/Client/VistasTeacher/ProgramarSesion.html';
    });
    
    document.getElementById('btnRevisarTareas').addEventListener('click', function() {
        alert('Redirigiendo a la vista para Revisar Tareas...');
        // Aquí iría window.location.href = '/Client/VistasTeacher/RevisarTareas.html';
    });

    // Ejemplo: Iniciar Sesión (para botones de Próximas Sesiones)
    // Puedes usar una clase en lugar de ID para manejar múltiples botones de sesión
    document.querySelectorAll('.btn-session').forEach(button => {
        button.addEventListener('click', function() {
            alert('¡Iniciando videollamada!');
        });
    });
});