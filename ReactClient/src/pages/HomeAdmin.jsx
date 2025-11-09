// src/pages/AdminHome.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
    const navigate = useNavigate();

    const [profesores, setProfesores] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [modalType, setModalType] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            alert("No estás autenticado. Inicia sesión.", "error");
            navigate("/login");
            return;
        }
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [profesRes, cursosRes] = await Promise.all([
                fetch("http://127.0.0.1:8000/administrador/profesores", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch("http://127.0.0.1:8000/administrador/all/cursos", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            if (!profesRes.ok || !cursosRes.ok)
                throw new Error("Error al cargar los datos.");

            setProfesores(await profesRes.json());
            setCursos(await cursosRes.json());
        } catch (err) {
            console.error(err);
            alert("Error al cargar la información.", "error");
        }
    };

    const handleAction = async (id, name, action) => {
        const endpoint =
            action === "approve"
                ? `http://127.0.0.1:8000/administrador/approve-profesor/${id}`
                : `http://127.0.0.1:8000/administrador/deny-profesor/${id}`;

        try {
            const res = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Error en la acción");

            alert(
                action === "approve"
                    ? `✅ Instructor ${name} aprobado correctamente.`
                    : `❎ Solicitud de ${name} rechazada.`,
                "success"
            );
            setProfesores((prev) => prev.filter((p) => p.id !== id));
        } catch {
            alert("❌ Error al procesar la solicitud.", "error");
        } finally {
            setModalType(null);
            setSelectedInstructor(null);
        }
    };

    const openModal = (instructor, type) => {
        setSelectedInstructor(instructor);
        setModalType(type);
    };

    return (
        <div className="min-h-screen bg-base-200 px-6 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-primary">
                        Panel de Administración
                    </h1>
                    <p className="opacity-70">
                        Gestiona usuarios, instructores, cursos y configuración del sistema
                    </p>
                </div>

                {/* === ACCIONES RÁPIDAS === */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        ⚡ Acciones Rápidas
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Gestionar Usuarios",
                                desc: "Administrar estudiantes y permisos",
                                icon: "fa-user-plus",
                                link: "/admin/usuarios",
                            },
                            {
                                title: "Verificar Instructores",
                                desc: "Revisar solicitudes de instructores",
                                icon: "fa-chalkboard-teacher",
                                link: "/admin/instructores",
                            },
                            {
                                title: "Gestionar Cursos",
                                desc: "Aprobar y moderar cursos",
                                icon: "fa-book",
                                link: "/admin/cursos",
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="card-body items-center text-center">
                                    <i className={`fa-solid ${card.icon} text-4xl text-primary`} />
                                    <h3 className="font-semibold mt-3">{card.title}</h3>
                                    <p className="text-sm opacity-70">{card.desc}</p>
                                    <button
                                        onClick={() => navigate(card.link)}
                                        className="btn btn-primary mt-2"
                                    >
                                        Acceder
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* === SOLICITUDES PENDIENTES === */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            🕒 Solicitudes Pendientes
                        </h2>
                        <button
                            className="link link-primary"
                            onClick={() => navigate("/admin/instructores")}
                        >
                            Ver todas
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                        <table className="table">
                            <thead>
                                <tr className="text-base-content/70">
                                    <th>Instructor</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profesores.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center opacity-60">
                                            No hay solicitudes pendientes
                                        </td>
                                    </tr>
                                ) : (
                                    profesores.slice(0, 5).map((p) => (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            p.nombre
                                                        )}&background=0e2a47&color=fff`}
                                                        alt={p.nombre}
                                                        className="mask mask-circle w-10 h-10"
                                                    />
                                                    <div>
                                                        <div className="font-semibold">{p.nombre}</div>
                                                        <div className="text-xs opacity-70">{p.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{p.rol || "—"}</td>
                                            <td>
                                                <span
                                                    className={`badge ${p.status === "Activo"
                                                            ? "badge-success"
                                                            : "badge-warning"
                                                        }`}
                                                >
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => openModal(p, "approve")}
                                                    >
                                                        <i className="fa-solid fa-check" />
                                                    </button>
                                                    <button
                                                        className="btn btn-error btn-sm"
                                                        onClick={() => openModal(p, "deny")}
                                                    >
                                                        <i className="fa-solid fa-times" />
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

                {/* === CURSOS RECIENTES === */}
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            📘 Cursos Recientes
                        </h2>
                        <button
                            className="link link-primary"
                            onClick={() => navigate("/admin/cursos")}
                        >
                            Ver todos
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
                        <table className="table">
                            <thead>
                                <tr className="text-base-content/70">
                                    <th>Curso</th>
                                    <th>Instructor</th>
                                    <th>Estudiantes</th>
                                    <th>Creación</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cursos.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center opacity-60">
                                            No hay cursos registrados
                                        </td>
                                    </tr>
                                ) : (
                                    cursos.slice(0, 5).map((c) => (
                                        <tr key={c.id}>
                                            <td>
                                                <div className="font-semibold">{c.titulo}</div>
                                                <div className="text-xs opacity-70">
                                                    {c.descripcion || "Sin descripción"}
                                                </div>
                                            </td>
                                            <td>{c.profesor_id || "—"}</td>
                                            <td>{c.estudiantes || 0}</td>
                                            <td>{c.creacion_curso || "—"}</td>
                                            <td>
                                                <span
                                                    className={`badge ${c.estado_curso === "Activo"
                                                            ? "badge-success"
                                                            : "badge-neutral"
                                                        }`}
                                                >
                                                    {c.estado_curso}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* === MODAL DE CONFIRMACIÓN === */}
            {modalType && selectedInstructor && (
                <dialog open className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            {modalType === "approve"
                                ? "Aprobar Instructor"
                                : "Rechazar Instructor"}
                        </h3>
                        <p className="py-4">
                            ¿Estás seguro de{" "}
                            {modalType === "approve" ? "aprobar" : "rechazar"} a{" "}
                            <b>{selectedInstructor.nombre}</b>?
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-outline"
                                onClick={() => setModalType(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                className={`btn ${modalType === "approve" ? "btn-success" : "btn-error"
                                    }`}
                                onClick={() =>
                                    handleAction(
                                        selectedInstructor.id,
                                        selectedInstructor.nombre,
                                        modalType
                                    )
                                }
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
}
