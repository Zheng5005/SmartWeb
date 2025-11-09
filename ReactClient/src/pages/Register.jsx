"use client"

import { useState } from "react"
import Logo from "../assets/logo.png"
import { Link } from "react-router-dom"

export default function Register() {
    const [userType, setUserType] = useState("student")
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        motivation: "",
        college: "",
        cedula: "",
    })

    const [modal, setModal] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const showModal = (type, title, message) => {
        setModal({ isOpen: true, type, title, message })
    }

    const closeModal = () => {
        setModal({ isOpen: false, type: "info", title: "", message: "" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { nombre, apellido, email, password, motivation, college, cedula } = formData
        if (!nombre || !apellido || !email || !password) {
            showModal("error", "Campos Requeridos", "Por favor, complete todos los campos obligatorios.")
            return
        }

        const role = userType === "teacher" ? "Profesor" : "Estudiante"

        if (userType === "teacher" && (!motivation || !college || !cedula)) {
            showModal("error", "Información Incompleta", "Por favor, complete todos los campos para ser profesor.")
            return
        }

        const data = {
            nombre,
            apellido,
            email,
            password,
            role,
            motivacion: motivation || null,
            profesor_institucion: college || null,
            profesor_cedula: cedula || null,
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            if (!response.ok) {
                showModal("error", "Error en Registro", result.detail || "No se pudo registrar")
                return
            }

            if (role === "Estudiante") {
                showModal("success", "Registro Exitoso", "Revisa tu correo para activar tu cuenta.")
            } else if (role === "Profesor") {
                showModal("success", "Solicitud Enviada", "Tu solicitud será revisada por un administrador.")
            }

            setTimeout(() => {
                window.location.href = "/login"
            }, 2000)
        } catch (error) {
            console.error("Error en el registro:", error)
            showModal("error", "Error de Conexión", "Ocurrió un error al conectar con el servidor.")
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content px-4 py-10">
            <div className="bg-base-200 shadow-xl rounded-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">
                {/* Formulario */}
                <div className="p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-primary mb-2">SmartWeb</h1>
                    <h2 className="text-xl font-semibold mb-1">Crea tu cuenta</h2>
                    <p className="text-sm opacity-70 mb-6">Selecciona tu tipo de usuario y regístrate</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Tipo de usuario */}
                        <div>
                            <label className="font-medium mb-2 block">¿Cómo deseas registrarte?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="userType"
                                        className="radio radio-primary"
                                        value="student"
                                        checked={userType === "student"}
                                        onChange={() => setUserType("student")}
                                    />
                                    <span>Estudiante</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="userType"
                                        className="radio radio-primary"
                                        value="teacher"
                                        checked={userType === "teacher"}
                                        onChange={() => setUserType("teacher")}
                                    />
                                    <span>Profesor</span>
                                </label>
                            </div>
                        </div>

                        {/* Nombres */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label-text font-medium">Nombre</label>
                                <input
                                    id="nombre"
                                    type="text"
                                    placeholder="Juan"
                                    className="input input-bordered w-full"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-text font-medium">Apellido</label>
                                <input
                                    id="apellido"
                                    type="text"
                                    placeholder="Pérez"
                                    className="input input-bordered w-full"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label-text font-medium">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="hello@ejemplo.com"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label-text font-medium">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="input input-bordered w-full"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Campos extra si es profesor */}
                        {userType === "teacher" && (
                            <>
                                <div>
                                    <label className="label-text font-medium">Motivación para ser profesor</label>
                                    <textarea
                                        id="motivation"
                                        rows="3"
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Cuéntanos por qué quieres ser profesor..."
                                        value={formData.motivation}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="label-text font-medium">Instituto</label>
                                    <input
                                        id="college"
                                        type="text"
                                        placeholder="UNICAES"
                                        className="input input-bordered w-full"
                                        value={formData.college}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label-text font-medium">Cédula Profesional</label>
                                    <input
                                        id="cedula"
                                        type="text"
                                        placeholder="1234"
                                        className="input input-bordered w-full"
                                        value={formData.cedula}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className="btn btn-primary w-full mt-4" id="registerButton">
                            Registrarse
                        </button>

                        <div className="text-sm text-center mt-3">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" className="link link-primary">
                                Iniciar Sesión
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Imagen lateral */}
                <div className="hidden md:flex flex-col items-center justify-center bg-base-300 p-6">
                    <img src={Logo || "/placeholder.svg"} alt="SmartWeb Logo" className="w-64 mb-4 rounded-xl" />
                    <p className="text-center opacity-80">Aprende a través de videollamadas</p>
                </div>
            </div>

            {modal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-base-100 rounded-lg shadow-lg p-6 max-w-sm w-full">
                        {/* Título con ícono */}
                        <div className="flex items-center gap-3 mb-4">
                            {modal.type === "error" && <div className="badge badge-error">✕</div>}
                            {modal.type === "success" && <div className="badge badge-success">✓</div>}
                            {modal.type === "info" && <div className="badge badge-info">ℹ</div>}
                            <h3 className="font-bold text-lg">{modal.title}</h3>
                        </div>

                        {/* Mensaje */}
                        <p className="mb-6 text-base-content opacity-80">{modal.message}</p>

                        {/* Botón cerrar */}
                        <div className="flex justify-end">
                            <button className="btn btn-sm btn-primary" onClick={closeModal}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
