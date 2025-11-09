import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export const Footer = () => (
    <footer className="footer footer-center bg-base-200 text-base-content p-6 mt-10 border-t border-base-300">
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
                <img src={Logo} alt="SMARTWEB Logo" className="w-10 h-10 rounded-lg" />
                <span className="font-bold text-lg">SMARTWEB</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link to="/politicas" className="link link-hover">
                    Políticas de Privacidad
                </Link>
                <Link to="/terminos" className="link link-hover">
                    Términos de Servicio
                </Link>
                <Link to="/about" className="link link-hover">
                    Contacto
                </Link>
            </div>

            <p className="mt-3 text-xs opacity-70">
                © 2025 SMARTWEB — Plataforma Educativa Internacional. Todos los derechos reservados.
            </p>
        </div>
    </footer>
);