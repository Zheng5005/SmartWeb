// Client/Homes/VerificarInstructores.js

document.addEventListener("DOMContentLoaded", async function () {

  // 1️⃣ CARGA DE INCLUDES
  if (typeof includeHTML === "function") {
    includeHTML("navbar-placeholder", "../includes/html/admin_navbar.html");
    includeHTML("footer-placeholder", "../includes/html/footer.html");
  } else {
    console.error("ERROR JS: La función includeHTML no se ha cargado.");
  }

  // 2️⃣ AUTENTICACIÓN
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estás autenticado. Inicia sesión.");
    window.location.href = "../login/login.html";
    return;
  }

  // 3️⃣ ELEMENTOS HTML
  const tablaBody = document.querySelector("tbody");
  let instructores = [];

  // 4️⃣ CARGAR DATOS DEL BACKEND
  try {
    const response = await fetch("http://127.0.0.1:8000/administrador/profesores", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Error al obtener las solicitudes de instructores");

    instructores = await response.json();
    renderInstructores(instructores);
  } catch (err) {
    console.error(err);
    tablaBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-danger">
          Error al cargar las solicitudes de instructores.
        </td>
      </tr>`;
  }

  // 5️⃣ FUNCIÓN PARA MOSTRAR LOS INSTRUCTORES EN LA TABLA
  function renderInstructores(lista) {
    tablaBody.innerHTML = "";

    if (lista.length === 0) {
      tablaBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-muted">
            No hay solicitudes pendientes
          </td>
        </tr>`;
      return;
    }

    lista.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.nombre)}&background=0e2a47&color=fff"
                  class="rounded-circle me-3" width="40" height="40" alt="${p.nombre}">
            <div>
              <strong class="instructor-name">${p.nombre}</strong>
              <div class="text-muted small instructor-email">${p.email}</div>
            </div>
          </div>
        </td>
        <td>${p.rol || "—"}</td>
        <td>${p.status || "Pendiente"}</td>
        <td>
          <button class="btn btn-primary btn-sm me-1 btn-ver-detalle"
                  data-id="${p.id}"
                  data-motivacion="${p.motivacion || "—"}"
                  data-fecha="${p.fecha_solicitud || "—"}"
                  data-especialidad="${p.especialidad || "—"}">
            <i class="fas fa-eye"></i> Detalle
          </button>
          <button class="btn btn-success btn-sm me-1 btn-aceptar" data-id="${p.id}">
            <i class="fas fa-check"></i> Aceptar
          </button>
          <button class="btn btn-danger btn-sm btn-rechazar" data-id="${p.id}">
            <i class="fas fa-times"></i> Rechazar
          </button>
        </td>`;
      tablaBody.appendChild(row);
    });

    // Vincular eventos a los botones
    initEventListeners();
  }

  // 6️⃣ EVENTOS DE BOTONES
  function initEventListeners() {
    // Mostrar Detalle
    document.querySelectorAll(".btn-ver-detalle").forEach(button => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        const nombre = row.querySelector(".instructor-name").textContent;
        const email = row.querySelector(".instructor-email").textContent;
        const motivacion = this.getAttribute("data-motivacion");
        const fecha = this.getAttribute("data-fecha");
        const especialidad = this.getAttribute("data-especialidad");

        document.getElementById("modalInstructorName").textContent = nombre;
        document.getElementById("modalInstructorEmail").textContent = email;
        document.getElementById("modalInstructorMotivacion").textContent = motivacion;
        document.getElementById("modalFechaSolicitud").textContent = fecha;
        document.getElementById("modalEspecialidad").textContent = especialidad;

        const modal = new bootstrap.Modal(document.getElementById("instructorDetalleModal"));
        modal.show();
      });
    });

    // Aceptar solicitud
    document.querySelectorAll(".btn-aceptar").forEach(btn => {
      btn.addEventListener("click", async function () {
        const instructorId = this.getAttribute("data-id");
        const instructorName = this.closest("tr").querySelector(".instructor-name").textContent;

        if (confirm(`¿Aceptar a ${instructorName} como profesor?`)) {
          try {
            const res = await fetch(`http://127.0.0.1:8000/approve-profesor/${instructorId}`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (!res.ok) throw new Error("Error al aprobar instructor");

            alert(`✅ Instructor ${instructorName} aprobado correctamente.`);
            this.closest("tr").remove();
          } catch (err) {
            alert("❌ Error al aprobar instructor.");
            console.error(err);
          }
        }
      });
    });

    // Rechazar solicitud
    document.querySelectorAll(".btn-rechazar").forEach(btn => {
      btn.addEventListener("click", async function () {
        const instructorId = this.getAttribute("data-id");
        const instructorName = this.closest("tr").querySelector(".instructor-name").textContent;

        if (confirm(`¿Rechazar la solicitud de ${instructorName}?`)) {
          try {
            const res = await fetch(`http://127.0.0.1:8000/deny-profesor/${instructorId}`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (!res.ok) throw new Error("Error al rechazar instructor");

            alert(`❎ Solicitud de ${instructorName} rechazada.`);
            this.closest("tr").remove();
          } catch (err) {
            alert("❌ Error al rechazar instructor.");
            console.error(err);
          }
        }
      });
    });
  }
});

