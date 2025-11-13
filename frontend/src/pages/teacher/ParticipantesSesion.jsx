"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotificationModal from "../../components/NotificationModal";

export default function ParticipantesSesion() {
  const { sesion_id } = useParams();
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setNotification({
        type: "error",
        message: "No estás autenticado. Inicia sesión.",
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const fetchParticipantes = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(url + `/participants/ccall/${sesion_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al obtener los participantes.");
        const data = await res.json();
        setParticipantes(data.participantes || []);
      } catch (err) {
        console.error(err);
        setNotification({
          type: "error",
          message: "❌ Error al cargar los participantes de la sesión.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, [sesion_id]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #eef2ff 0%, #f3f8ff 50%, #ffffff 100%)",
      }}
    >
      {/* 🧭 ENCABEZADO */}
      <header className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-14 px-6 shadow-md">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            👥 Participantes de la Sesión
          </h1>
          <p className="text-white/90 text-lg">
            Visualiza los asistentes registrados a esta videollamada.
          </p>
        </div>
      </header>

      {/* 📋 LISTA DE PARTICIPANTES */}
      <main className="container mx-auto px-6 py-14 max-w-5xl">
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4">Cargando participantes...</p>
          </div>
        ) : participantes.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-lg">
            No hay participantes en esta sesión 💤
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {participantes.map((p) => (
              <div
                key={p.id_usuario}
                className="bg-white shadow-xl rounded-2xl border border-gray-200 px-8 py-10 text-center
                           hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {p.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-semibold text-gray-800 text-lg">
                  {p.nombre}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{p.email}</p>
              </div>
            ))}
          </div>
        )}

        {/* 🔙 VOLVER */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary btn-lg px-10 shadow-md"
          >
            ← Volver
          </button>
        </div>
      </main>

      {/* 🔔 MODAL */}
      {notification && (
        <NotificationModal
          isOpen={true}
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
