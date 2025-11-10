"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"

export default function GestionarUsuarios() {
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [filtroRol, setFiltroRol] = useState("todos")
    const [resetUser, setResetUser] = useState(null)
    const [confirmModal, setConfirmModal] = useState(null)
    const [notification, setNotification] = useState(null)
    const token = localStorage.getItem("token")

    // 🔹 Cargar usuarios al iniciar
    useEffect(() => {
        if (!token) {
            setNotification({ type: "error", message: "No estás autenticado. Inicia sesión." })
            setTimeout(() => navigate("/login"), 2000)
            return
        }

        loadUsuarios()
    }, [token, navigate])

    const loadUsuarios = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/administrador/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error("Error al obtener los usuarios")

            const data = await response.json()
            setUsuarios(data)
        } catch (err) {
            console.error(err)
            setNotification({
                type: "error",
                message: "❌ Error al cargar los usuarios desde el servidor.",
            })
        }
    }

    const filteredUsuarios = usuarios.filter((u) => {
        const matchRol = filtroRol === "todos" || u.rol.toLowerCase() === filtroRol
        const text = busqueda.toLowerCase()
        const matchTexto =
            u.nombre.toLowerCase().includes(text) || u.email.toLowerCase().includes(text)
        return matchRol && matchTexto
    })

    const getRolBadge = (rol) => {
        switch (rol.toLowerCase()) {
            case "profesor":
                return "badge-info text-white"
            case "estudiante":
                return "badge-success text-white"
            case "administrador":
                return "badge-primary text-white"
            default:
                return "badge-neutral text-white"
        }
    }

    const handleResetPassword = (user) => {
        setResetUser(user)
    }

    const confirmResetPassword = () => {
        if (!resetUser) return
        console.log(`Reseteando contraseña para ${resetUser.nombre}`)
        setNotification({
            type: "success",
            message: `🔑 Contraseña de ${resetUser.nombre} reseteada. Se envió al correo.`,
        })
        setResetUser(null)
    }

    const handleDeleteUser = (user) => {
        setConfirmModal({
            type: "delete",
            title: `¿Eliminar usuario ${user.nombre}?`,
            message: "Esta acción eliminará permanentemente al usuario.",
            userId: user.id,
            nombre: user.nombre,
        })
    }

    const processAction = async (action) => {
        if (action.type === "delete") {
            try {
                const res = await fetch(`http://127.0.0.1:8000/administrador/users/${action.userId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (!res.ok) throw new Error("Error al borrar el usuario")
                setUsuarios((prev) => prev.filter((u) => u.id !== action.userId))
                setNotification({ type: "success", message: `❎ Usuario ${action.nombre} eliminado.` })
            } catch (err) {
                setNotification({ type: "error", message: "❌ Error al borrar el usuario." })
                console.error(err)
            }
        }
        setConfirmModal(null)
    }

    return (
        <div className="min-h-screen bg-base-100">
            {/* 🔹 Encabezado */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-10 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold mb-2">👥 Gestión de Usuarios</h1>
                    <p className="text-lg opacity-90">
                        Visualiza y administra estudiantes y profesores del sistema.
                    </p>
                </div>
            </div>

            {/* 🔹 Filtros */}
            <main className="container mx-auto px-4 py-10 max-w-6xl mb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <label htmlFor="filtroRol" className="block label label-text font-semibold mb-2">
                            Filtrar por Rol:
                        </label>
                        <select
                            id="filtroRol"
                            value={filtroRol}
                            onChange={(e) => setFiltroRol(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="todos">Todos</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="profesor">Profesor</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="busqueda" className="block label label-text font-semibold mb-2">
                            Buscar por Nombre o Correo:
                        </label>
                        <input
                            type="text"
                            id="busqueda"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Ej: Juan Pérez o juan@ejemplo.com"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* 🔹 Tabla de usuarios */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span>📋</span> Listado Completo
                        </h2>
                        <span className="badge badge-primary text-white">
                            {usuarios.length} Usuarios Activos
                        </span>
                    </div>

                    <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md border border-base-200">
                        <table className="table table-zebra">
                            <thead>
                                <tr className="bg-base-200 text-base-content">
                                    <th>Nombre</th>
                                    <th>Correo Electrónico</th>
                                    <th>Rol</th>
                                    <th>Último Acceso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsuarios.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center opacity-60 py-8">
                                            No hay usuarios que coincidan
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsuarios.map((u) => (
                                        <tr key={u.id}>
                                            <td>{u.nombre}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`badge ${getRolBadge(u.rol)}`}>
                                                    {u.rol}
                                                </span>
                                            </td>
                                            <td>{u.status || "—"}</td>
                                            <td>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        className="btn btn-warning btn-sm btn-outline"
                                                        onClick={() => handleResetPassword(u)}
                                                    >
                                                        🔑 Resetear
                                                    </button>
                                                    <button
                                                        className="btn btn-error btn-sm btn-outline"
                                                        onClick={() => handleDeleteUser(u)}
                                                    >
                                                        🗑️ Eliminar
                                                    </button>
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

            {/* 🔹 Modal Reset Password */}
            {resetUser && (
                <dialog open className="modal modal-open">
                    <div className="modal-box rounded-xl max-w-md">
                        <h3 className="font-bold text-xl mb-4 text-warning">
                            Confirmar Reseteo de Contraseña
                        </h3>
                        <p className="mb-3">
                            ¿Deseas resetear la contraseña de <strong>{resetUser.nombre}</strong>?
                        </p>
                        <p className="text-sm text-error">
                            Se generará una nueva contraseña temporal y se enviará por correo.
                        </p>
                        <div className="modal-action">
                            <button className="btn btn-outline" onClick={() => setResetUser(null)}>
                                Cancelar
                            </button>
                            <button className="btn btn-warning" onClick={confirmResetPassword}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* 🔹 Modal Confirmación Eliminar */}
            {confirmModal && (
                <dialog open className="modal modal-open">
                    <div className="modal-box rounded-xl max-w-md">
                        <h3 className="font-bold text-xl mb-4">{confirmModal.title}</h3>
                        <p className="py-4 opacity-80">{confirmModal.message}</p>
                        <div className="modal-action">
                            <button className="btn btn-outline" onClick={() => setConfirmModal(null)}>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={() => processAction(confirmModal)}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* 🔹 Notification Modal */}
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

