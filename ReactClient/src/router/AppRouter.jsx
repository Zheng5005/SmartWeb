import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminHome from "../pages/HomeAdmin";
import ProfesorHome from "../pages/HomeTeacher";
import UsuarioHome from "../pages/HomeStudent";
import AboutUs from "../pages/AboutUS";

import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbar = ["/login", "/register"].includes(location.pathname);
    return (
        <>
            {!hideNavbar && <Navbar />}
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
};

export const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={["administrador"]}>
                                    <AdminHome />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profesor"
                            element={
                                <ProtectedRoute allowedRoles={["profesor"]}>
                                    <ProfesorHome />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/usuario"
                            element={
                                <ProtectedRoute allowedRoles={["estudiante"]}>
                                    <UsuarioHome />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/about" element={<AboutUs />} />
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
};
