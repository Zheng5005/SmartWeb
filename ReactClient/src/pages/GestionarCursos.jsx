"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../components/NotificationModal"

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
        // Convertir datos mock a array con id
        const coursesArray = Object.entries(cursosData).map(([id, data]) => ({
            id,
            ...data,
        }))
        setCursos(coursesArray)
    }

    const fetchCourseDetails = (courseId) => {
        return cursosData[courseId] || null
    }

    const handleViewDetail = (courseId) => {
        const details = fetchCourseDetails(courseId)
        if (details) {
            setSelectedCourse(details)
            setModalOpen(true)
        } else {
            setNotification({ type: "error", message: `Error: Curso con ID ${courseId} no encontrado.` })
        }
    }

    const handleApprove = (courseId, courseTitle) => {
        setConfirmModal({
            type: "approve",
            title: `Confirmar APROBACIÓN del curso: ${courseTitle}`,
            courseId,
            courseTitle,
        })
    }

    const handleReject = (courseId, courseTitle) => {
        setConfirmModal({
            type: "reject",
            title: `Confirmar RECHAZO del curso: ${courseTitle}?`,
            message: "Esta acción es irreversible.",
            courseId,
            courseTitle,
        })
    }

    const handleToggleStatus = (courseId, currentStatus, courseTitle) => {
        const newStatus = currentStatus === "activo" ? "inactivo" : "activo"
        setConfirmModal({
            type: "toggle",
            title: `${newStatus === "inactivo" ? "INACTIVAR" : "ACTIVAR"} el curso: ${courseTitle}`,
            courseId,
            courseTitle,
            newStatus,
        })
    }

    const processAction = (action) => {
        if (action.type === "approve") {
            console.log(`Aprobando curso ID: ${action.courseId}`)
            setNotification({ type: "success", message: `✅ Curso '${action.courseTitle}' aprobado.` })
        } else if (action.type === "reject") {
            console.log(`Rechazando curso ID: ${action.courseId}`)
            setNotification({ type: "error", message: `❎ Curso '${action.courseTitle}' rechazado.` })
        } else if (action.type === "toggle") {
            console.log(`Cambiando estado de curso ID: ${action.courseId} a ${action.newStatus}`)
            setNotification({
                type: "success",
                message: `✅ Curso '${action.courseTitle}' cambiado a ${action.newStatus.toUpperCase()}.`,
            })
        }
        setConfirmModal(null)
    }

    const filteredCourses = cursos.filter((curso) => {
        const matchesEstado = filtroEstado === "todos" || curso.status === filtroEstado
        const matchesBusqueda =
            busqueda === "" ||
            curso.title.toLowerCase().includes(busqueda.toLowerCase()) ||
            curso.instructor.toLowerCase().includes(busqueda.toLowerCase())
        return matchesEstado && matchesBusqueda
    })

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "pendiente":
                return "badge-warning text-white"
            case "activo":
                return "badge-success text-white"
            case "inactivo":
                return "badge-neutral text-white"
            default:
                return "badge-gray"
        }
    }

    const pendingCount = cursos.filter((c) => c.status === "pendiente").length

    return (
        <div className="min-h-screen bg-base-100">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-10 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold mb-2">📚 Gestión de Cursos</h1>
                    <p className="text-lg opacity-90">Revisa solicitudes de nuevos cursos y administra el catálogo actual.</p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-10 max-w-6xl mb-5">
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="filtroEstado" className="block label label-text font-semibold mb-2">
                                Filtrar por Estado:
                            </label>
                            <select
                                id="filtroEstado"
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
                            <label htmlFor="busquedaCurso" className="block label label-text font-semibold mb-2">
                                Buscar por Título o Instructor:
                            </label>
                            <input
                                type="text"
                                id="busquedaCurso"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                placeholder="Ej: React o Juan Pérez"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span>📖</span> Catálogo de Cursos
                        </h2>
                        {pendingCount > 0 && (
                            <span className="badge badge-warning text-white">{pendingCount} Cursos Pendientes</span>
                        )}
                    </div>

                    <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-200">
                        <table className="table table-zebra">
                            <thead>
                                <tr className="bg-base-200 text-base-content">
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
                                        <td colSpan="6" className="text-center opacity-60 py-8">
                                            No hay cursos que coincidan con los filtros
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCourses.map((curso) => (
                                        <tr key={curso.id} className="hover:bg-base-100">
                                            <td className="font-semibold">{curso.title}</td>
                                            <td>{curso.instructor}</td>
                                            <td>{curso.creationDate}</td>
                                            <td>{curso.students.length || "—"}</td>
                                            <td>
                                                <span className={`badge ${getStatusBadgeColor(curso.status)}`}>
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
                                                    {curso.status === "pendiente" && (
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
                                                    {curso.status !== "pendiente" && (
                                                        <button
                                                            className={`btn btn-sm btn-outline ${curso.status === "activo" ? "btn-warning" : "btn-success"}`}
                                                            onClick={() => handleToggleStatus(curso.id, curso.status, curso.title)}
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

            {/* Detail Modal */}
            {modalOpen && selectedCourse && (
                <dialog open className="modal modal-open">
                    <div className="modal-box rounded-xl max-w-2xl">
                        <h3 className="font-bold text-2xl mb-6">📖 Detalles del Curso</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h6 className="font-semibold text-primary mb-2">👨‍🏫 Instructor</h6>
                                <p className="text-lg">{selectedCourse.instructor}</p>
                            </div>
                            <div>
                                <h6 className="font-semibold text-primary mb-2">📅 Fecha de Creación</h6>
                                <p className="text-lg">{selectedCourse.creationDate}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h5 className="font-bold text-lg mb-2">ℹ️ Descripción del Curso</h5>
                            <p className="p-4 bg-base-200 rounded-lg border border-primary/20">{selectedCourse.description}</p>
                        </div>

                        <div className="mb-6">
                            <h5 className="font-bold text-lg mb-3">👥 Estudiantes Inscritos</h5>
                            {selectedCourse.students.length > 0 ? (
                                <ul className="list-group space-y-2">
                                    {selectedCourse.students.map((student, idx) => (
                                        <li key={idx} className="p-3 bg-base-200 rounded-lg">
                                            {student}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="opacity-60">No hay estudiantes inscritos (o curso pendiente/nuevo).</p>
                            )}
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Confirmation Modal */}
            {confirmModal && (
                <dialog open className="modal modal-open">
                    <div className="modal-box rounded-xl">
                        <h3 className="font-bold text-xl mb-4">{confirmModal.title}</h3>
                        {confirmModal.message && <p className="py-4 opacity-80">{confirmModal.message}</p>}
                        <div className="modal-action">
                            <button className="btn btn-outline" onClick={() => setConfirmModal(null)}>
                                Cancelar
                            </button>
                            <button
                                className={`btn ${confirmModal.type === "approve"
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

            {/* Notification Modal */}
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
