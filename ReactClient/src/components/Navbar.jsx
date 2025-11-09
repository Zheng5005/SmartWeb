import { Link } from "react-router-dom";
import { LogOut, Home, Users, BookOpen, GraduationCap } from "lucide-react";
import Logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const role = user?.role?.toLowerCase();

    return (
        <nav className="navbar bg-base-100 border-b border-base-300 px-6 py-3 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                    <img src={Logo} alt="SMARTWEB Logo" className="w-10 h-10 rounded-lg" />
                    SMARTWEB
                </Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {role === "administrador" && (
                        <>
                            <li><Link to="/admin"><Home size={18} /> Home</Link></li>
                            <li><Link to="/admin/usuarios"><Users size={18} /> Usuarios</Link></li>
                            <li><Link to="/admin/instructores"><GraduationCap size={18} /> Instructores</Link></li>
                            <li><Link to="/admin/cursos"><BookOpen size={18} /> Cursos</Link></li>
                        </>
                    )}

                    {role === "estudiante" && (
                        <>
                            <li><Link to="/usuario"><Home size={18} /> Inicio</Link></li>
                            <li><Link to="/usuario/miscursos"><BookOpen size={18} /> Mis Cursos</Link></li>
                        </>
                    )}

                    {role === "profesor" && (
                        <>
                            <li><Link to="/profesor"><Home size={18} /> Panel</Link></li>
                            <li><Link to="/profesor/cursos"><BookOpen size={18} /> Cursos</Link></li>
                        </>
                    )}

                    {role && (
                        <li>
                            <button onClick={logout} className="btn btn-ghost text-error flex items-center gap-2">
                                <LogOut size={18} /> Cerrar sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
