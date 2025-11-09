import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/logo.png";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.detail || "Error al iniciar sesión.");
                setLoading(false);
                return;
            }

            // 🔐 Guarda token y rol en AuthContext
            login({
                access_token: data.access_token,
                role: data.role?.toLowerCase(),
            });

            alert(`Inicio de sesión exitoso como ${data.role} ✅`);

            // 🔀 Redirigir según rol (asegurándonos de usar toLowerCase)
            const role = data.role?.toLowerCase();
            switch (role) {
                case "administrador":
                    navigate("/admin", { replace: true });
                    break;
                case "profesor":
                    navigate("/profesor", { replace: true });
                    break;
                case "estudiante":
                    navigate("/usuario", { replace: true });
                    break;
                default:
                    navigate("/", { replace: true });
            }
        } catch (err) {
            console.error("Error en login:", err);
            alert("Error de conexión con el servidor.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content px-4 py-10">
            <div className="bg-base-200 shadow-xl rounded-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">
                {/* Formulario */}
                <div className="p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-primary mb-2">SmartWeb</h1>
                    <h2 className="text-xl font-semibold mb-1">Bienvenido de nuevo</h2>
                    <p className="text-sm opacity-70 mb-6">
                        Ingresa a tu cuenta para seguir aprendiendo
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="label-text font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="hello@ejemplo.com"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="label-text font-medium">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>

                        <div className="text-sm text-center mt-3">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register" className="link link-primary">
                                Regístrate
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Imagen lateral */}
                <div className="hidden md:flex flex-col items-center justify-center bg-base-300 p-6">
                    <img
                        src={Logo}
                        alt="SmartWeb Logo"
                        className="w-64 mb-4 rounded-xl"
                    />
                    <p className="text-center opacity-80">
                        Aprende a través de videollamadas
                    </p>
                </div>
            </div>
        </div>
    );
}
