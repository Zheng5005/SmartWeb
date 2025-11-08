// Client/VistasTeacher/MisCursos.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. CARGA DE NAVBAR Y FOOTER
    if (typeof includeHTML === 'function') {
        // RUTA: ../../includes/html/teacher_navbar.html
        includeHTML('navbar-placeholder', '../includes/html/teacher_navbar.html');
        
        // RUTA: ../../includes/html/footer.html
        includeHTML('footer-placeholder', '../includes/html/footer.html');
    } else {
        console.error("ERROR JS: La función 'includeHTML' no está definida.");
    }

    // 2. SIMULACIÓN DE DATOS (Conectarse a la fuente real aquí)
    const cursos = [
        {
            id: "C001",
            titulo: "Introducción a la Inteligencia Artificial",
            categoria: "Tecnología",
            descripcion: "Aprende los fundamentos de la IA moderna.",
            fecha: "2025-11-01",
            estado: "Pendiente",
            sesiones: [
                { fecha: "2025-11-12", hora: "10:00 AM" },
                { fecha: "2025-11-15", hora: "10:00 AM" },
            ]
        },
        {
            id: "C002",
            titulo: "Ciberseguridad para Principiantes",
            categoria: "Tecnología",
            descripcion: "Conoce las amenazas más comunes y cómo protegerte.",
            fecha: "2025-10-28",
            estado: "Activo",
            sesiones: [
                { fecha: "2025-11-09", hora: "7:00 PM" },
            ]
        },
        {
            id: "C003",
            titulo: "Metodologías Ágiles en la Educación",
            categoria: "Educación",
            descripcion: "Aplicación de Scrum y Kanban en entornos educativos.",
            fecha: "2025-09-20",
            estado: "Inactivo",
            sesiones: [
                { fecha: "2025-11-20", hora: "8:00 PM" },
            ]
        },
    ];

    window.renderCursos(cursos); 
});

// Función para renderizar los cursos en la tabla
window.renderCursos = function(cursos) {
    const tabla = document.getElementById("tablaCursos");
    tabla.innerHTML = "";

    if (cursos.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No tienes cursos creados aún.</td></tr>';
        return;
    }

    cursos.forEach(curso => {
        const badgeClass =
            curso.estado === "Activo" ? "success" :
            curso.estado === "Pendiente" ? "warning" : "secondary";

        tabla.innerHTML += `
            <tr>
                <td>${curso.titulo}</td>
                <td>${curso.categoria}</td>
                <td>${curso.fecha}</td>
                <td><span class="badge bg-${badgeClass}">${curso.estado}</span></td>
                <td>${curso.sesiones.length}</td>
                <td>
                    <div class="d-flex flex-wrap justify-content-center gap-2"> 
                        <button class="btn btn-primary btn-sm" onclick='verDetalle(${JSON.stringify(curso)})'>
                            <i class="fas fa-eye"></i> Ver
                        </button>
                        <button class="btn btn-secondary btn-sm">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-danger btn-sm">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

// Función para mostrar los detalles del curso en el modal
window.verDetalle = function(curso) {
    document.getElementById("detalleTitulo").textContent = curso.titulo;
    document.getElementById("detalleDescripcion").textContent = curso.descripcion;

    const lista = document.getElementById("detalleSesiones");
    lista.innerHTML = "";
    curso.sesiones.forEach(s => {
        lista.innerHTML += `<li class="list-group-item">${s.fecha} — ${s.hora}</li>`;
    });

    const modal = new bootstrap.Modal(document.getElementById("detalleCursoModal"));
    modal.show();
}