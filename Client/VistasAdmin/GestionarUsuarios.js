// Client/Homes/GestionarUsuarios.js
document.addEventListener('DOMContentLoaded', async function() {
    
  // 1️⃣ CARGA DE INCLUDES
  if (typeof includeHTML === 'function') {
      includeHTML('navbar-placeholder', '../includes/html/admin_navbar.html');
      includeHTML('footer-placeholder', '../includes/html/footer.html');
  } else {
      console.error("ERROR JS: La función includeHTML no se ha cargado. Revisa la ruta.");
  }
  
  // 2️⃣ LÓGICA DEL MODAL DE RESETEO DE CONTRASEÑA
  const resetPasswordModal = document.getElementById('resetPasswordModal');

  resetPasswordModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const userName = button.getAttribute('data-user-name');
      const userId = button.getAttribute('data-user-id');

      document.getElementById('modalUserName').textContent = userName;
      document.getElementById('resetUserId').value = userId;
  });

  document.getElementById('confirmResetBtn').addEventListener('click', function() {
      const userId = document.getElementById('resetUserId').value;
      const userName = document.getElementById('modalUserName').textContent;

      console.log(`Intentando resetear contraseña para User ID: ${userId} (${userName})`);
      alert(`Contraseña de ${userName} reseteada exitosamente. Se ha enviado una contraseña temporal a su correo.`);

      const modalInstance = bootstrap.Modal.getInstance(resetPasswordModal);
      modalInstance.hide();
  });

  // 3️⃣ LÓGICA DE LLAMADAS AL BACKEND
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No estás autenticado. Inicia sesión");
    window.location.href = "../login/login.html";
    return;
  }

  const tablaBody = document.querySelector("tbody");
  const filtroRol = document.getElementById("filtroRol");
  const busqueda = document.getElementById("busqueda");

  let usuarios = [];

  try {
    const response = await fetch("http://127.0.0.1:8000/administrador/users", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Error al obtener los usuarios");

    usuarios = await response.json();
    renderUsuarios(usuarios);
  } catch (err) {
    tablaBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          Error al cargar los usuarios
        </td>
      </tr>`;
    console.log(err);
  }

  // 4️⃣ FILTROS Y BÚSQUEDA
  filtroRol.addEventListener('change', filtrarYMostrar);
  busqueda.addEventListener('input', filtrarYMostrar);

  // 🔍 Función para combinar filtros
  function filtrarYMostrar() {
    const rolSeleccionado = filtroRol.value;
    const texto = busqueda.value.toLowerCase();

    const filtrados = usuarios.filter(u => {
      const coincideRol = rolSeleccionado === "todos" || u.rol.toLowerCase() === rolSeleccionado;
      const coincideTexto =
        u.nombre.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto);
      return coincideRol && coincideTexto;
    });

    renderUsuarios(filtrados);
  }

  // 🧱 Renderizar tabla
  function renderUsuarios(lista) {
    tablaBody.innerHTML = "";

    if (lista.length === 0) {
      tablaBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted">No hay usuarios que coincidan</td>
        </tr>`;
      return;
    }

    lista.forEach(u => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="user-name">${u.nombre}</td>
        <td class="user-email">${u.email}</td>
        <td><span class="badge ${getRolBadge(u.rol)}">${u.rol}</span></td>
        <td>${u.status || "—"}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-reset-password"
                  data-user-id="${u.id}"
                  data-user-name="${u.nombre}"
                  data-bs-toggle="modal"
                  data-bs-target="#resetPasswordModal">
            <i class="fas fa-key"></i> Resetear
          </button>
        </td>`;
      tablaBody.appendChild(row);
    });
  }

  // 🟦 Estilo de badges
  function getRolBadge(rol) {
    switch (rol.toLowerCase()) {
      case "profesor":
        return "bg-info";
      case "estudiante":
        return "bg-success";
      case "administrador":
        return "bg-primary";
    }
  }
});

