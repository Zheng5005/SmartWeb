// Client/Homes/GestionarCursos.js

// Función simulada para obtener detalles del curso
// En un proyecto real, esto sería una llamada FETCH al API
function fetchCourseDetails(courseId) {
    console.log(`Fetching details for course ID: ${courseId}`);
    
    // Datos simulados (puedes ajustarlos)
    const data = {
        'C103': {
            title: 'Curso Avanzado de IA con Python',
            instructor: 'Elena Torres',
            creationDate: '01 Nov 2025',
            description: 'Propuesta para un curso de alto nivel que abarca redes neuronales avanzadas y despliegue de modelos en la nube. Pendiente de revisión.',
            students: [],
            status: 'pendiente'
        },
        'C101': {
            title: 'Mastering React Hooks',
            instructor: 'Juan Pérez',
            creationDate: '15 Sep 2025',
            description: 'Curso completo sobre el uso de Hooks modernos en React.js, incluyendo Reducers, Context y efectos avanzados. ¡Ya aprobado!',
            students: ['Estudiante A', 'Estudiante B', 'Estudiante C', 'Estudiante D', 'Estudiante E'],
            status: 'activo'
        },
        'C102': {
            title: 'Fundamentos de Diseño UX/UI',
            instructor: 'María González',
            creationDate: '05 Jun 2025',
            description: 'Introducción al proceso de diseño centrado en el usuario, incluyendo wireframing, prototipado y pruebas de usabilidad.',
            students: ['Alumno 1', 'Alumno 2', 'Alumno 3', 'Alumno 4'],
            status: 'inactivo'
        }
    };
    
    return data[courseId] || null;
}

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CARGA DE INCLUDES (Rutas ajustadas a VistasAdmin/)
    if (typeof includeHTML === 'function') {
        includeHTML('navbar-placeholder', '../includes/html/admin_navbar.html');
        includeHTML('footer-placeholder', '../includes/html/footer.html');
    }
    
    // 2. LÓGICA DEL MODAL (Ver Detalle)
    document.querySelectorAll('.btn-ver-detalle').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            const details = fetchCourseDetails(courseId);

            if (details) {
                // Rellenar Modal con detalles generales
                document.getElementById('modalCourseTitle').textContent = details.title;
                document.getElementById('modalCourseInstructor').textContent = details.instructor;
                document.getElementById('modalCourseCreationDate').textContent = details.creationDate;
                document.getElementById('modalCourseDescription').textContent = details.description;
                
                // Rellenar lista de estudiantes
                const studentsListContainer = document.getElementById('modalCourseStudentsList');
                studentsListContainer.innerHTML = ''; // Limpiar lista anterior

                if (details.students.length > 0) {
                    const ul = document.createElement('ul');
                    ul.className = 'list-group list-group-flush';
                    details.students.forEach(student => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item';
                        li.textContent = student;
                        ul.appendChild(li);
                    });
                    studentsListContainer.appendChild(ul);
                } else {
                    studentsListContainer.innerHTML = '<p class="text-muted">No hay estudiantes inscritos (o curso pendiente/nuevo).</p>';
                }

                // Mostrar el modal
                const detailModal = new bootstrap.Modal(document.getElementById('courseDetailModal'));
                detailModal.show();
            } else {
                alert(`Error: Curso con ID ${courseId} no encontrado.`);
            }
        });
    });

    // 3. LÓGICA DE ACCIONES (Aprobar/Rechazar y Activar/Inactivar)
    
    // Aprobar Curso (para cursos pendientes)
    document.querySelectorAll('.btn-action-aprobar').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            const courseTitle = this.closest('tr').querySelector('.course-title').textContent;
            if (confirm(`¿Confirmas la APROBACIÓN del curso: ${courseTitle}?`)) {
                console.log(`Aprobando curso ID: ${courseId}`);
                // Lógica de FETCH para aprobación
                alert(`Curso '${courseTitle}' aprobado. Actualiza la página.`);
            }
        });
    });

    // Rechazar Curso (para cursos pendientes)
    document.querySelectorAll('.btn-action-rechazar').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            const courseTitle = this.closest('tr').querySelector('.course-title').textContent;
            if (confirm(`¿Confirmas el RECHAZO del curso: ${courseTitle}? Esta acción es irreversible.`)) {
                console.log(`Rechazando curso ID: ${courseId}`);
                // Lógica de FETCH para rechazo
                alert(`Curso '${courseTitle}' rechazado. Actualiza la página.`);
            }
        });
    });

    // Cambiar Estado (para cursos ya aprobados: Activar/Inactivar)
    document.querySelectorAll('.btn-action-estado').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            const currentStatus = this.getAttribute('data-current-status');
            const newStatus = currentStatus === 'activo' ? 'inactivo' : 'activo';
            const actionText = newStatus === 'inactivo' ? 'INACTIVAR' : 'ACTIVAR';
            const courseTitle = this.closest('tr').querySelector('.course-title').textContent;

            if (confirm(`¿Estás seguro de que quieres ${actionText} el curso: ${courseTitle}?`)) {
                console.log(`Cambiando estado de curso ID: ${courseId} a ${newStatus}`);
                // Lógica de FETCH para cambio de estado
                alert(`Curso '${courseTitle}' cambiado a estado ${newStatus.toUpperCase()}. Actualiza la página.`);
            }
        });
    });
    
    // 4. LÓGICA DE FILTROS
    document.getElementById('filtroEstado').addEventListener('change', function() {
        console.log(`Filtrando cursos por estado: ${this.value}`);
        // Aquí iría la lógica para recargar o filtrar la tabla
    });
});