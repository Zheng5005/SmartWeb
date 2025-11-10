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

  useEffect(() => {
    if (!token) {
      setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
      setTimeout(() => navigate("/login"), 2000)
      return
    }
    loadCourses()
  }, [token, navigate])

  const loadCourses = () => {
    const coursesArray = Object.entries(cursosData).map(([id, data]) => ({ id, ...data }))
    setCursos(coursesArray)
  }

  const fetchCourseDetails = (courseId) => cursosData[courseId] || null

  const handleViewDetail = (courseId) => {
    const details = fetchCourseDetails(courseId)
    if (details) {
      setSelectedCourse(details)
      setModalOpen(true)
    } else {
      setNotification({ type: "error", message: `Error: Curso con ID ${courseId} no encontrado.` })
    }
  }

  const handleApprove = (courseId, courseTitle) =>
    setConfirmModal({
      type: "approve",
      title: `Confirmar aprobación del curso: ${courseTitle}`,
      courseId,
      courseTitle,
    })

  const handleReject = (courseId, courseTitle) =>
    setConfirmModal({
      type: "reject",
      title: `Rechazar curso: ${courseTitle}`,
      message: "Esta acción es irreversible.",
      courseId,
      courseTitle,
    })

  const handleToggleStatus = (courseId, currentStatus, courseTitle) => {
    const newStatus = currentStatus === "activo" ? "inactivo" : "activo"
    setConfirmModal({
      type: "toggle",
      title: `${newStatus === "inactivo" ? "Inactivar" : "Activar"} el curso: ${courseTitle}`,
      courseId,
      courseTitle,
      newStatus,
    })
  }

  const processAction = (action) => {
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

  const filteredCourses = cursos.filter((curso) => {
    const matchEstado = filtroEstado === "todos" || curso.status === filtroEstado
    const query = busqueda.toLowerCase()
    const matchTexto =
      query === "" ||
      curso.title.toLowerCase().includes(query) ||
      curso.instructor.toLowerCase().includes(query)
    return matchEstado && matchTexto
  })

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 rounded-full text-sm font-medium"
      case "activo":
        return "bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full text-sm font-medium"
      case "inactivo":
        return "bg-gray-100 text-gray-600 border border-gray-300 px-3 py-1 rounded-full text-sm font-medium"
      default:
        return "bg-blue-100 text-blue-700 border border-blue-300 px-3 py-1 rounded-full text-sm font-medium"
    }
  }

  const pendingCount = cursos.filter((c) => c.status === "pendiente").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-10 px-6 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold mb-2">📚 Gestión de Cursos</h1>
          <p className="text-lg text-white/90">
            Revisa solicitudes de nuevos cursos y administra el catálogo actual.
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-6 py-10 max-w-6xl space-y-10">
        {/* Filtros */}
        <section className="bg-white rounded-2xl shadow border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold mb-8 border-l-4 border-indigo-500 pl-3 text-gray-800">
            Filtros de búsqueda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por estado:
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por título o instructor:
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
            <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 text-gray-800">
              Catálogo de Cursos
            </h2>
            {pendingCount > 0 && (
              <span className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full font-medium text-sm shadow-sm">
                {pendingCount} cursos pendientes
              </span>
            )}
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
            <table className="table">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
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
                    <td colSpan="6" className="text-center text-gray-500 py-8">
                      No hay cursos que coincidan con los filtros 💤
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((curso) => (
                    <tr key={curso.id} className="hover:bg-gray-50 transition">
                      <td className="font-medium text-gray-800">{curso.title}</td>
                      <td className="text-gray-700">{curso.instructor}</td>
                      <td className="text-gray-600">{curso.creationDate}</td>
                      <td className="text-gray-600">{curso.students.length || "—"}</td>
                      <td>
                        <span className={getStatusBadgeColor(curso.status)}>
                          {curso.status.charAt(0).toUpperCase() + curso.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            className="btn btn-sm border border-indigo-400 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                            onClick={() => handleViewDetail(curso.id)}
                          >
                            👁️ Detalle
                          </button>

                          {curso.status === "pendiente" && (
                            <>
                              <button
                                className="btn btn-sm border border-green-400 text-green-600 hover:bg-green-600 hover:text-white transition"
                                onClick={() => handleApprove(curso.id, curso.title)}
                              >
                                ✓ Aprobar
                              </button>
                              <button
                                className="btn btn-sm border border-red-400 text-red-600 hover:bg-red-600 hover:text-white transition"
                                onClick={() => handleReject(curso.id, curso.title)}
                              >
                                ✕ Rechazar
                              </button>
                            </>
                          )}

                          {curso.status !== "pendiente" && (
                            <button
                              className={`btn btn-sm border ${
                                curso.status === "activo"
                                  ? "border-yellow-400 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                                  : "border-green-400 text-green-600 hover:bg-green-500 hover:text-white"
                              } transition`}
                              onClick={() =>
                                handleToggleStatus(curso.id, curso.status, curso.title)
                              }
                            >
                              {curso.status === "activo" ? "⊘ Inactivar" : "✓ Activar"}
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

      {/* Modal de Detalle */}
      {modalOpen && selectedCourse && (
        <dialog open className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-2xl bg-white border border-gray-200">
            <h3 className="font-bold text-2xl mb-6 text-indigo-700">📘 Detalles del Curso</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h6 className="font-semibold text-gray-700 mb-2">👨‍🏫 Instructor</h6>
                <p className="text-gray-800">{selectedCourse.instructor}</p>
              </div>
              <div>
                <h6 className="font-semibold text-gray-700 mb-2">📅 Fecha de Creación</h6>
                <p className="text-gray-800">{selectedCourse.creationDate}</p>
              </div>
            </div>

            <div className="mb-6">
              <h5 className="font-bold text-gray-700 mb-2">ℹ️ Descripción</h5>
              <p className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            <div className="mb-6">
              <h5 className="font-bold text-gray-700 mb-3">👥 Estudiantes Inscritos</h5>
              {selectedCourse.students.length > 0 ? (
                <ul className="space-y-2">
                  {selectedCourse.students.map((student, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-700"
                    >
                      {student}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="opacity-70">No hay estudiantes inscritos.</p>
              )}
            </div>

            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal Confirmación */}
      {confirmModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box rounded-2xl p-6 bg-white border border-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-800">{confirmModal.title}</h3>
            {confirmModal.message && <p className="py-4 text-gray-600">{confirmModal.message}</p>}
            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setConfirmModal(null)}>
                Cancelar
              </button>
              <button
                className={`btn ${
                  confirmModal.type === "approve"
                    ? "btn-success"
                    : confirmModal.type === "reject"
                    ? "btn-error"
                    : "btn-warning"
                }`}
                onClick={() => processAction(confirmModal)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </dialog>
      )}

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
