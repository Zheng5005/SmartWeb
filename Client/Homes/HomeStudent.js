// Client/Homes/HomeStudent.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Asumiendo que html_includes.js está cargado (../js/html_includes.js)
    if (typeof includeHTML === 'function') {
        
        // Cargar Navbar de Estudiante
        // RUTA: Sube de Homes/ a Client/ y baja a includes/html/
        includeHTML('navbar-placeholder', '../includes/html/student_navbar.html');
        
        // Cargar Footer (reutilizando el fragmento existente)
        // RUTA: Sube de Homes/ a Client/ y baja a includes/html/
        includeHTML('footer-placeholder', '../includes/html/footer.html');
        
    } else {
        console.error("ERROR JS: La función includeHTML no se ha cargado.");
    }

    // AÑADIR CUALQUIER OTRA LÓGICA ESPECÍFICA DEL HOME ESTUDIANTE AQUÍ
    
    // Ejemplo: Lógica para el botón "Unirse a Clase"
    document.querySelector('.btn-session').addEventListener('click', function() {
        alert('Redirigiendo a la sesión de videollamada...');
        // Aquí iría la lógica para iniciar la videollamada
    });
});