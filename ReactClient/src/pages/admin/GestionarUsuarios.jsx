"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"

export default function GestionarCursos() {
  const navigate = useNavigate()
  const [cursos, setCursos] = useState([])
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmModal, setConfirmModal] = useState(null)
  const [notification, setNotification] = useState(null)

  const token = localStorage.getItem("token")

  // 🧠 Datos mock (no tocar)
  const cursosData = {
    C103: {
      title: "Curso Avanzado de IA con Python",
      instructor: "Elena Torres",
      creationDate: "01 Nov 2025",
      description:
        "Propuesta para un curso de alto nivel que abarca redes neuronales avanzadas y despliegue de modelos en la nube. Pendiente de revisión.",
      students: [],
      status: "pendiente",
    },
    C101: {
      title: "Mastering React Hooks",
      instructor: "Juan Pérez",
      creationDate: "15 Sep 2025",
      description:
        "Curso completo sobre el uso de Hooks modernos en React.js, incluyendo Reducers, Context y efectos avanzados. ¡Ya aprobado!",
      students: ["Estudiante A", "Estudiante B", "Estudiante C", "Estudiante D", "Estudiante E"],
      status: "activo",
    },
    C102: {
      title: "Fundamentos de Diseño UX/UI",
      instructor: "María González",
      creationDate: "05 Jun 2025",
      description:
        "Introducción al proceso de diseño centrado en el usuario, incluyendo wireframing, prototipado y pruebas de usabilidad.",
      students: ["Alumno 1", "Alumno 2", "Alumno 3", "Alumno 4"],
      status: "inactivo",
    },
  }

  // 🔹 Cargar cursos solo una vez al montar
  useEffect(() => {
    if (!token) {
      setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
      setTimeout(() => navigate("/login"), 2000)
      return
    }
    loadCourses()
  }, [token])

  // 🔹 Cargar datos mock en el estado
  const loadCourses = () => {
    const coursesArray = Object.entries(cursosData).map(([id, data]) => ({ id, ...data }))
    setCursos(coursesArray)
  }

  // 🔹 Normalización segura
  const normalizar = (s = "") => String(s).trim().toLowerCase()

  // 🧩 🔥 FILTRO FUNCIONAL (recalculado cuando cambian los filtros o cursos)
  const filteredCourses = cursos.filter((curso) => {
    const cursoEstado = normalizar(curso.status)
    const filtro = normalizar(filtroEstado)
    const matchesEstado = filtro === "todos" || cursoEstado === filtro

    const q = normalizar(busqueda)
    const title = normalizar(curso.title)
    const instructor = normalizar(curso.instructor)
    const matchesBusqueda = q === "" || title.includes(q) || instructor.includes(q)

    return matchesEstado && matchesBusqueda
  })

  // 🔹 Función para obtener color del estado
  const getStatusBadgeColor = (status) => {
    const s = normalizar(status)
    switch (s) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-sm font-medium"
      case "activo":
        return "bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm font-medium"
      case "inactivo":
        return "bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full text-sm font-medium"
      default:
        return "bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium"
    }
  }

  const pendingCount = cursos.filter((c) => normalizar(c.status) === "pendiente").length

  // 🧩 Handlers (iguales que antes)
  const handleViewDetail = (courseId) => {
    const details = cursosData[courseId]
    if (details) {
      setSelectedCourse({ id: courseId, ...details })
      setModalOpen(true)
    } else {
      setNotification({ type: "error", message: `Error: Curso con ID ${courseId} no encontrado.` })
    }
  }

  const handleApprove = (courseId, courseTitle) => {
    setConfirmModal({
      type: "approve",
      title: `Confirmar aprobación del curso: ${courseTitle}`,
      courseId,
      courseTitle,
    })
  }

  const handleReject = (courseId, courseTitle) => {
    setConfirmModal({
      type: "reject",
      title: `Rechazar curso: ${courseTitle}`,
      message: "Esta acción es irreversible.",
      courseId,
      courseTitle,
    })
  }

  const handleToggleStatus = (courseId, currentStatus, courseTitle) => {
    const newStatus = (currentStatus || "").toLowerCase() === "activo" ? "inactivo" : "activo"
    setConfirmModal({
      type: "toggle",
      title: `${newStatus === "inactivo" ? "Inactivar" : "Activar"} el curso: ${courseTitle}`,
      courseId,
      courseTitle,
      newStatus,
    })
  }

  const processAction = (action) => {
    if (!action) return
    if (action.type === "approve") {
      setNotification({ type: "success", message: `✅ Curso '${action.courseTitle}' aprobado.` })
    } else if (action.type === "reject") {
      setNotification({ type: "error", message: `❎ Curso '${action.courseTitle}' rechazado.` })
    } else if (action.type === "toggle") {
      setNotification({
        type: "success",
        message: `🔄 Curso '${action.courseTitle}' cambiado a ${action.newStatus.toUpperCase()}.`,
      })
    }
    setConfirmModal(null)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]" data-theme="light">
      {/* Encabezado */}
      <header className="bg-gradient-to-r from-indigo-700 to-cyan-500 text-white py-10 px-6 shadow">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2">📚 Gestión de Cursos</h1>
          <p className="text-lg opacity-90">
            Revisa solicitudes de nuevos cursos y administra el catálogo actual.
          </p>
        </div>
      </header>

      {/* Filtros */}
      <main className="container mx-auto px-6 py-12 max-w-6xl space-y-12">
        <section className="bg-white rounded-2xl shadow border border-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-indigo-600 pl-3">Filtros</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filtrar por Estado:
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente de Revisión</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar por Título o Instructor:
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Ej: React o Juan Pérez"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </section>

        {/* Tabla */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-600 pl-3">
              Catálogo de Cursos
            </h2>
            {pendingCount > 0 && (
              <span className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full font-medium text-sm">
                {pendingCount} cursos pendientes
              </span>
            )}
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
            <table className="table">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <th>Curso</th>
                  <th>Instructor</th>
                  <th>Fecha Creación</th>
                  <th>Estudiantes</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-10">
                      No hay cursos que coincidan con los filtros 💤
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((curso) => (
                    <tr key={curso.id} className="hover:bg-gray-50 transition">
                      <td className="font-medium text-gray-800">{curso.title}</td>
                      <td className="text-gray-600">{curso.instructor}</td>
                      <td className="text-gray-600">{curso.creationDate}</td>
                      <td className="text-gray-600">
                        {(curso.students && curso.students.length) || "—"}
                      </td>
                      <td>
                        <span className={getStatusBadgeColor(curso.status)}>
                          {curso.status.charAt(0).toUpperCase() + curso.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            className="btn btn-primary btn-sm btn-outline"
                            onClick={() => handleViewDetail(curso.id)}
                          >
                            👁️ Detalle
                          </button>

                          {normalizar(curso.status) === "pendiente" && (
                            <>
                              <button
                                className="btn btn-success btn-sm btn-outline"
                                onClick={() => handleApprove(curso.id, curso.title)}
                              >
                                ✓ Aprobar
                              </button>
                              <button
                                className="btn btn-error btn-sm btn-outline"
                                onClick={() => handleReject(curso.id, curso.title)}
                              >
                                ✕ Rechazar
                              </button>
                            </>
                          )}

                          {normalizar(curso.status) !== "pendiente" && (
                            <button
                              className={`btn btn-sm btn-outline ${
                                normalizar(curso.status) === "activo"
                                  ? "btn-warning"
                                  : "btn-success"
                              }`}
                              onClick={() =>
                                handleToggleStatus(curso.id, curso.status, curso.title)
                              }
                            >
                              {normalizar(curso.status) === "activo"
                                ? "⊘ Inactivar"
                                : "✓ Activar"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {notification && (
        <NotificationModal
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}
