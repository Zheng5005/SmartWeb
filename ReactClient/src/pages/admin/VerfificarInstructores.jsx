"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"
import { formatDate } from "../../helpers/date"

export default function VerificarInstructores() {
    const navigate = useNavigate()
    const [instructores, setInstructores] = useState([])
    const [selectedInstructor, setSelectedInstructor] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [confirmModal, setConfirmModal] = useState(null)
    const [notification, setNotification] = useState(null)

    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
            setTimeout(() => navigate("/login"), 2000)
            return
        }
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const profesRes = await fetch("http://127.0.0.1:8000/administrador/profesores", {
                    headers: { Authorization: `Bearer ${token}` },
                })

            if (!profesRes.ok ) throw new Error("Error al cargar los datos.")

            setInstructores(await profesRes.json())
        } catch (err) {
            console.error(err)
            alert("Error al cargar la información.", "error")
        }
    }

    const handleViewDetail = (inst) => {
        setSelectedInstructor(inst)
        setModalOpen(true)
    }

    const handleApprove = (inst) => {
        setConfirmModal({
            type: "approve",
            title: `¿Aprobar a ${inst.nombre}?`,
            message: "El instructor podrá crear cursos una vez aprobado.",
            id: inst.id,
            nombre: inst.nombre,
        })
    }

    const handleReject = (inst) => {
        setConfirmModal({
            type: "reject",
            title: `¿Rechazar a ${inst.nombre}?`,
            message: "Esta acción no se puede deshacer.",
            id: inst.id,
            nombre: inst.nombre,
        })
    }

    const processAction = async (action) => {
        if (action.type === "approve") {
            try {
              const res = await fetch(`http://127.0.0.1:8000/administrador/approve-profesor/${confirmModal.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
              })

              if (!res.ok) throw new Error("Error en la acción")

              setNotification({ type: "success", message: `✅ Instructor ${action.nombre} aprobado.` })
              setInstructores((prev) => prev.filter((p) => p.id !== confirmModal.id))
            } catch (error) {
              console.log(error)
              setNotification({ type: "error", message: `Ocurrio un error al aprobar Instructor, intentelo más tarde` })
            } finally {
              setConfirmModal(null)
            }
        } else if (action.type === "reject") { 
            try {
              const res = await fetch(`http://127.0.0.1:8000/administrador/deny-profesor/${confirmModal.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
              })

              if (!res.ok) throw new Error("Error en la acción")

              setNotification({ type: "success", message: `❎ Instructor ${action.nombre} rechazado.` })
              setInstructores((prev) => prev.filter((p) => p.id !== confirmModal.id))
            } catch (error) {
              console.log(error)
              setNotification({ type: "error", message: `Ocurrio un error al rechazar Instructor, intentelo más tarde` })
            } finally {
              setConfirmModal(null)
            }
        }
    }

    return (
        <div className="min-h-screen bg-base-100">
            {/* 🔹 Encabezado */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-10 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold mb-2">🧑‍🏫 Verificación de Instructores</h1>
                    <p className="text-lg opacity-90">
                        Revisa y gestiona las solicitudes para convertirse en profesor.
                    </p>
                </div>
            </div>

            {/* 🔹 Contenido principal */}
            <main className="container mx-auto px-4 py-10 max-w-6xl mb-5">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span>📋</span> Solicitudes Pendientes
                    </h2>
                    <span className="badge badge-warning text-white">
                        {instructores.length} Solicitudes
                    </span>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-200">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-base-200 text-base-content">
                                <th>Instructor</th>
                                <th>Rol</th>
                                <th>Estado Solicitud</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructores.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center opacity-60 py-8">
                                        No hay solicitudes pendientes
                                    </td>
                                </tr>
                            ) : (
                                instructores.map((inst) => (
                                    <tr key={inst.id} className="hover:bg-base-100">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inst.nombre)}&background=0e2a47&color=fff`}
                                                    alt={inst.nombre}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-semibold">{inst.nombre}</p>
                                                    <p className="text-sm opacity-70">{inst.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{inst.rol}</td>
                                        <td>{inst.status}</td>
                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    className="btn btn-primary btn-sm btn-outline"
                                                    onClick={() => handleViewDetail(inst)}
                                                >
                                                    👁️ Detalle
                                                </button>
                                                <button
                                                    className="btn btn-success btn-sm btn-outline"
                                                    onClick={() => handleApprove(inst)}
                                                >
                                                    ✓ Aprobar
                                                </button>
                                                <button
                                                    className="btn btn-error btn-sm btn-outline"
                                                    onClick={() => handleReject(inst)}
                                                >
                                                    ✕ Rechazar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* 🔹 Modal Detalle */}
            {modalOpen && selectedInstructor && (
                <dialog open className="modal modal-open">
                    <div className="modal-box rounded-xl max-w-2xl">
                        <h3 className="font-bold text-2xl mb-6">📄 Detalles del Instructor</h3>

                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedInstructor.nombre)}&background=0e2a47&color=fff`}
                                alt={selectedInstructor.nombre}
                                className="w-16 h-16 rounded-full"
                            />
                            <div>
                                <p className="text-xl font-semibold">{selectedInstructor.nombre}</p>
                                <p className="text-sm opacity-70">{selectedInstructor.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h6 className="font-semibold text-primary mb-2">📅 Fecha Solicitud</h6>
                                <p className="text-lg">{formatDate(selectedInstructor.fecha)}</p>
                            </div>
                            <div>
                                <h6 className="font-semibold text-primary mb-2">🛠️ Cedula</h6>
                                <p className="text-lg">{selectedInstructor.cedula}</p>
                            </div>
                            <div>
                                <h6 className="font-semibold text-primary mb-2">🛠️ Institución</h6>
                                <p className="text-lg">{selectedInstructor.instituto}</p>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold text-lg mb-2">💬 Motivación</h5>
                            <p className="p-4 bg-base-200 rounded-lg border border-primary/20">
                                {selectedInstructor.motivacion}
                            </p>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* 🔹 Modal Confirmación */}
            {confirmModal && (
                <dialog open className="modal modal-open">
                    <div className="modal-box rounded-xl">
                        <h3 className="font-bold text-xl mb-4">{confirmModal.title}</h3>
                        {confirmModal.message && (
                            <p className="py-4 opacity-80">{confirmModal.message}</p>
                        )}
                        <div className="modal-action">
                            <button
                                className="btn btn-outline"
                                onClick={() => setConfirmModal(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                className={`btn ${
                                    confirmModal.type === "approve"
                                        ? "btn-success"
                                        : "btn-error"
                                }`}
                                onClick={() => processAction(confirmModal)}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* 🔹 Modal de Notificación */}
            {notification && (
                <NotificationModal
                    isOpen={true}
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    )
}

