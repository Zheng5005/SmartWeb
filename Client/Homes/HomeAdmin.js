// Client/Homes/HomeAdmin.js
document.addEventListener('DOMContentLoaded', async function() {
  // 1️⃣ CARGA DE INCLUDES
  if (typeof includeHTML === 'function') {
    includeHTML('navbar-placeholder', '../includes/html/admin_navbar.html');
    includeHTML('footer-placeholder', '../includes/html/footer.html');
  } else {
    console.error("No se encontró la función includeHTML. Verifica las rutas.");
  }

  // 2️⃣ VALIDACIÓN DE SESIÓN
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estás autenticado. Inicia sesión.");
    window.location.href = "../login/login.html";
    return;
  }

  // 3️⃣ OBTENER ELEMENTOS
  const tablaProfe = document.getElementById("profesores");
  const tablaCursos = document.getElementById("cursos");

  let profesores = [];
  let cursos = [];

  // 4️⃣ LLAMADAS AL BACKEND
  try {
    const [profesRes, cursosRes] = await Promise.all([
      fetch("http://127.0.0.1:8000/administrador/profesores", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      fetch("http://127.0.0.1:8000/administrador/all/cursos", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    ]);

    if (!profesRes.ok) throw new Error("Error al obtener los profesores");
    if (!cursosRes.ok) throw new Error("Error al obtener los cursos");

    profesores = await profesRes.json();
    cursos = await cursosRes.json();

    renderProfes(profesores);
    renderCursos(cursos);

  } catch (err) {
    console.error(err);
    tablaProfe.innerHTML = `
      <tr><td colspan="5" class="text-center text-danger">Error al cargar los profesores</td></tr>`;
    tablaCursos.innerHTML = `
      <tr><td colspan="5" class="text-center text-danger">Error al cargar los cursos</td></tr>`;
  }

  // 5️⃣ FUNCIÓN PARA MOSTRAR PROFESORES
  function renderProfes(lista) {
    tablaProfe.innerHTML = "";

    if (!lista || lista.length === 0) {
      tablaProfe.innerHTML = `
        <tr><td colspan="5" class="text-center text-muted">No hay solicitudes pendientes</td></tr>`;
      return;
    }

    lista.slice(0, 5).forEach(p => { // muestra solo los 5 más recientes
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.nombre)}&background=0e2a47&color=fff"
                 class="rounded-circle me-3" width="40" height="40" alt="${p.nombre}">
            <div>
              <strong>${p.nombre}</strong>
              <div class="text-muted small">${p.email}</div>
            </div>
          </div>
        </td>
        <td>${p.rol || "—"}</td>
        <td>
          <span class="badge ${p.status === "Activo" ? "bg-success" : "bg-warning"} text-white">${p.status}</span>
        </td>
        <td>
          <button class="btn btn-success btn-sm me-1" data-id="${p.id}">
            <i class="fas fa-check"></i>
          </button>
          <button class="btn btn-danger btn-sm" data-id="${p.id}">
            <i class="fas fa-times"></i>
          </button>
        </td>
      `;
      tablaProfe.appendChild(row);
    });
  }

  // 6️⃣ FUNCIÓN PARA MOSTRAR CURSOS
  function renderCursos(lista) {
    tablaCursos.innerHTML = "";

    if (!lista || lista.length === 0) {
      tablaCursos.innerHTML = `
        <tr><td colspan="5" class="text-center text-muted">No hay cursos registrados</td></tr>`;
      return;
    }

    lista.slice(0, 5).forEach(c => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <strong>${c.titulo}</strong>
          <div class="text-muted small">${c.descripcion || "Sin descripción"}</div>
        </td>
        <td>${c.profesor_id || "—"}</td>
        <td>${c.estudiantes || 0}</td>
        <td>${c.creacion_curso || "—"}</td>
        <td>
          <span class="badge ${c.estado_curso === "Activo" ? "bg-success" : "bg-secondary"} text-white">${c.estado_curso}</span>
        </td>
      `;
      tablaCursos.appendChild(row);
    });
  }
});

