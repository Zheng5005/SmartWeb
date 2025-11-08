// Client/VistasTeacher/CrearCursos.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. CARGA DE NAVBAR Y FOOTER
    
    // La función includeHTML se define en ../../js/html_includes.js
    if (typeof includeHTML === 'function') {
        
        // Cargar Navbar del Docente.
        // Ruta: Subir dos niveles (../../) hasta Client/ y bajar a includes/html/
        includeHTML('navbar-placeholder', '../includes/html/teacher_navbar.html');
        
        // Cargar Footer.
        includeHTML('footer-placeholder', '../includes/html/footer.html');

    } else {
        console.error("ERROR JS: La función 'includeHTML' no está definida. Asegúrese de que '../../js/html_includes.js' se haya cargado correctamente en el HTML.");
    }

    // 2. LÓGICA ESPECÍFICA DE CREACIÓN DE CURSOS
    const crearCursoForm = document.getElementById('crearCursoForm');
    const listaSesiones = document.getElementById('listaSesiones');
    const agregarSesionBtn = document.getElementById('agregarSesionBtn');
    const sesiones = [];

    // Hacemos la función global para el onclick en el HTML generado
    window.eliminarSesion = function(i) {
        sesiones.splice(i, 1);
        renderSesiones();
    }

    agregarSesionBtn.addEventListener('click', () => {
        const fecha = document.getElementById('fechaSesion').value;
        const hora = document.getElementById('horaSesion').value;

        if (!fecha || !hora) {
            alert('Por favor selecciona fecha y hora válidas.');
            return;
        }

        // Validación para evitar duplicados y mejorar UX
        if (sesiones.some(s => s.fecha === fecha && s.hora === hora)) {
            alert('Esta sesión ya ha sido agregada.');
            return;
        }

        sesiones.push({ fecha, hora });
        renderSesiones();
        
        document.getElementById('fechaSesion').value = '';
        document.getElementById('horaSesion').value = '';
    });

    function renderSesiones() {
        listaSesiones.innerHTML = '';
        
        if (sesiones.length === 0) {
            listaSesiones.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No hay sesiones programadas</td></tr>';
            return;
        }
        
        // Opcional: Ordenar sesiones
        sesiones.sort((a, b) => {
            const dateA = new Date(`${a.fecha}T${a.hora}`);
            const dateB = new Date(`${b.fecha}T${b.hora}`);
            return dateA - dateB;
        });

        sesiones.forEach((s, index) => {
            listaSesiones.innerHTML += `
                <tr>
                    <td>${s.fecha}</td>
                    <td>${s.hora}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="eliminarSesion(${index})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `;
        });
    }

    // Envío del formulario
    crearCursoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (sesiones.length === 0) {
            alert('Debe agregar al menos una sesión.');
            return;
        }

        // Mostrar modal de éxito
        const modal = new bootstrap.Modal(document.getElementById('cursoCreadoModal'));
        modal.show();
        
        e.target.reset();
        sesiones.length = 0;
        renderSesiones();
    });
});