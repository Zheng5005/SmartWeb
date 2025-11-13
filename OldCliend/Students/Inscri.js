// Client/VistasStudent/Inscri.js

// Datos de ejemplo de cursos (todos gratuitos)
const coursesData = [
    {
        id: 1,
        title: "Matemáticas Avanzadas - Álgebra Lineal",
        instructor: "Dr. Juan Pérez",
        category: "matematicas",
        level: "Avanzado",
        description: "Domina los conceptos fundamentales del álgebra lineal incluyendo vectores, matrices, espacios vectoriales y transformaciones lineales.",
        students: 24,
        duration: "8 semanas",
        rating: 4.8,
        nextSession: "Lunes, 15 Mar - 3:00 PM",
        enrolled: false,
        popular: true,
        certified: true,
        beginner: false,
        advanced: true
    },
    {
        id: 2,
        title: "Programación Web Full Stack",
        instructor: "Ing. María González",
        category: "programacion",
        level: "Intermedio",
        description: "Aprende HTML, CSS, JavaScript, React, Node.js y MongoDB para convertirte en desarrollador full stack.",
        students: 142,
        duration: "12 semanas",
        rating: 4.9,
        nextSession: "Martes, 16 Mar - 2:00 PM",
        enrolled: false,
        popular: true,
        certified: true,
        beginner: false,
        advanced: false
    },
    {
        id: 3,
        title: "Inglés Conversacional para Negocios",
        instructor: "Prof. Robert Johnson",
        category: "idiomas",
        level: "Intermedio",
        description: "Mejora tu fluidez en inglés con enfoque en situaciones empresariales y profesionales.",
        students: 89,
        duration: "10 semanas",
        rating: 4.7,
        nextSession: "Miércoles, 17 Mar - 6:00 PM",
        enrolled: true,
        popular: true,
        certified: true,
        beginner: false,
        advanced: false
    },
    {
        id: 4,
        title: "Introducción a Python desde Cero",
        instructor: "Dr. Carlos López",
        category: "programacion",
        level: "Principiante",
        description: "Aprende los fundamentos de Python desde cero. Perfecto para quienes inician en programación.",
        students: 315,
        duration: "6 semanas",
        rating: 4.6,
        nextSession: "Jueves, 18 Mar - 4:00 PM",
        enrolled: false,
        popular: false,
        certified: false,
        beginner: true,
        advanced: false
    },
    {
        id: 5,
        title: "Diseño Gráfico con Herramientas Libres",
        instructor: "Diseñadora Ana Martínez",
        category: "diseno",
        level: "Principiante",
        description: "Domina GIMP, Inkscape y otras herramientas gratuitas para crear diseños profesionales.",
        students: 67,
        duration: "8 semanas",
        rating: 4.5,
        nextSession: "Viernes, 19 Mar - 10:00 AM",
        enrolled: false,
        popular: false,
        certified: true,
        beginner: true,
        advanced: false
    },
    {
        id: 6,
        title: "Física Cuántica para Todos",
        instructor: "Dr. Laura Chen",
        category: "ciencias",
        level: "Avanzado",
        description: "Explora los misterios de la física cuántica de manera accesible y fascinante.",
        students: 45,
        duration: "10 semanas",
        rating: 4.9,
        nextSession: "Sábado, 20 Mar - 11:00 AM",
        enrolled: false,
        popular: false,
        certified: true,
        beginner: false,
        advanced: true
    },
    {
        id: 7,
        title: "Emprendimiento Digital",
        instructor: "Lic. Pedro Rodríguez",
        category: "negocios",
        level: "Intermedio",
        description: "Aprende a crear y hacer crecer tu negocio en el mundo digital.",
        students: 78,
        duration: "8 semanas",
        rating: 4.7,
        nextSession: "Lunes, 22 Mar - 7:00 PM",
        enrolled: false,
        popular: true,
        certified: true,
        beginner: false,
        advanced: false
    },
    {
        id: 8,
        title: "Teoría Musical Básica",
        instructor: "Prof. Sofía Hernández",
        category: "musica",
        level: "Principiante",
        description: "Aprende los fundamentos de la música: notas, escalas, acordes y ritmo.",
        students: 34,
        duration: "6 semanas",
        rating: 4.8,
        nextSession: "Martes, 23 Mar - 5:00 PM",
        enrolled: false,
        popular: false,
        certified: false,
        beginner: true,
        advanced: false
    }
];

let filteredCourses = [...coursesData];
let currentFilter = 'all';

// Cargar cursos
function loadCourses() {
    const grid = document.getElementById('coursesGrid');
    const loading = document.getElementById('loadingState');
    const empty = document.getElementById('emptyState');

    // Muestra carga antes de simular
    loading.style.display = 'block';
    empty.style.display = 'none';
    grid.innerHTML = '';


    // Simular carga (1 segundo)
    setTimeout(() => {
        loading.style.display = 'none';

        if (filteredCourses.length === 0) {
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';

        filteredCourses.forEach(course => {
            const courseCard = createCourseCard(course);
            grid.appendChild(courseCard);
        });
    }, 1000);
}

// Crear tarjeta de curso
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-image">
            <div class="course-category">${getCategoryName(course.category)}</div>
            <div class="course-level">${course.level}</div>
            <div class="free-badge">
                <i class="fas fa-gift me-1"></i>Gratuito
            </div>
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <div class="course-instructor">
                <div class="instructor-avatar">${course.instructor.split(' ').map(n => n[0]).join('')}</div>
                ${course.instructor}
            </div>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <div class="meta-item">
                    <i class="fas fa-users"></i>
                    ${course.students} estudiantes
                </div>
                <div class="meta-item">
                    <i class="fas fa-star text-warning"></i>
                    ${course.rating}
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="text-success fw-bold">
                    <i class="fas fa-gift me-1"></i>Completamente Gratuito
                </div>
            </div>
            <button class="btn ${course.enrolled ? 'btn-enrolled' : 'btn-enroll'}" 
                    onclick="${course.enrolled ? '' : `enrollInCourse(${course.id})`}">
                <i class="fas ${course.enrolled ? 'fa-check' : 'fa-user-plus'} me-2"></i>
                ${course.enrolled ? 'Inscrito' : 'Inscribirse Gratis'}
            </button>
        </div>
    `;

    // Agregar evento para abrir modal
    card.addEventListener('click', (e) => {
        // Asegura que no se abra el modal si se hace click en el botón de inscribir
        if (!e.target.closest('button')) {
            openCourseModal(course);
        }
    });

    return card;
}

// Abrir modal de curso
function openCourseModal(course) {
    document.getElementById('modalCourseTitle').textContent = course.title;
    // Se usa el ID que faltaba en el HTML original para el instructor:
    document.getElementById('modalInstructor').textContent = course.instructor; 
    document.getElementById('modalDescription').textContent = course.description;
    document.getElementById('modalDuration').textContent = course.duration;
    document.getElementById('modalLevel').textContent = course.level;
    document.getElementById('modalStudents').textContent = course.students;
    document.getElementById('modalNextSession').textContent = course.nextSession;
    // Se usa el ID que faltaba en el HTML original para el rating:
    document.getElementById('modalRating').textContent = course.rating; 

    const enrollBtn = document.getElementById('modalEnrollBtn');
    if (course.enrolled) {
        enrollBtn.innerHTML = '<i class="fas fa-check me-2"></i>Ya estás inscrito';
        enrollBtn.className = 'btn btn-enrolled';
        enrollBtn.disabled = true;
    } else {
        enrollBtn.innerHTML = '<i class="fas fa-user-plus me-2"></i>Inscribirse Gratis';
        enrollBtn.className = 'btn btn-enroll';
        enrollBtn.onclick = () => enrollInCourse(course.id);
        enrollBtn.disabled = false;
    }

    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    modal.show();
}

// Inscribirse en curso
window.enrollInCourse = function(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    
    if (course.enrolled) {
        alert('Ya estás inscrito en este curso');
        return;
    }

    // Simular proceso de inscripción
    if (confirm(`¿Estás seguro de que quieres inscribirte en "${course.title}"?`)) {
        course.enrolled = true;
        
        // Actualizar la vista
        loadCourses();
        
        // Cerrar modal si está abierto
        const modalElement = document.getElementById('courseModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        
        alert('¡Inscripción exitosa! Ahora puedes acceder a las sesiones de este curso.');
    }
}

// Filtrar cursos
function filterCourses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    filteredCourses = coursesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                              course.instructor.toLowerCase().includes(searchTerm) ||
                              course.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || course.category === category;
        
        let matchesFilter = true;
        if (currentFilter === 'popular') matchesFilter = course.popular;
        // La lógica original usaba !course.popular para "new", lo mantengo:
        if (currentFilter === 'new') matchesFilter = !course.popular; 
        if (currentFilter === 'beginner') matchesFilter = course.beginner;
        if (currentFilter === 'advanced') matchesFilter = course.advanced;
        if (currentFilter === 'certified') matchesFilter = course.certified;

        return matchesSearch && matchesCategory && matchesFilter;
    });

    loadCourses();
}

// Obtener nombre de categoría
function getCategoryName(category) {
    const categories = {
        'matematicas': 'Matemáticas',
        'programacion': 'Programación',
        'idiomas': 'Idiomas',
        'diseno': 'Diseño',
        'ciencias': 'Ciencias',
        'negocios': 'Negocios',
        'musica': 'Música'
    };
    return categories[category] || category;
}

// Event Listeners y Inicialización
document.addEventListener('DOMContentLoaded', function() {
    
    // Cargar Navbar y Footer (Usando la función modular global)
    if (typeof includeHTML === 'function') {
        // Nota: Asumiendo que Student Navbar se llama student_navbar.html
        includeHTML('navbar-placeholder', '../includes/html/student_navbar.html');
        includeHTML('footer-placeholder', '../includes/html/footer.html');
    } else {
        console.warn("La función 'includeHTML' no está disponible. Navbar y Footer deben cargarse manualmente.");
    }

    // 1. Listeners para Búsqueda y Filtro de Categoría
    document.getElementById('searchInput').addEventListener('input', filterCourses);
    document.getElementById('categoryFilter').addEventListener('change', filterCourses);

    // 2. Listeners para los Tags de Filtro
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            filterCourses();
        });
    });

    // 3. Cargar Cursos Inicialmente
    loadCourses();
});