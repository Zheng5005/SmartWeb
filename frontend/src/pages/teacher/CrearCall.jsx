import React, { useState, useEffect } from "react";
import { FaVideo, FaCopy, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CreateCallPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(url + `/courses/active/only`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error al obtener cursos:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleCreateCall = async () => {
    if (!selectedCourse || !titulo || !horaInicio || !horaFin) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(url + `/hope/createCall`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curso_id: selectedCourse,
          titulo,
          descripcion,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
          origen: window.location.origin,
        }),
      });

      if (!res.ok) throw new Error("Error al crear la llamada");
      const data = await res.json();
      setCreatedLink(data.enlace_llamada);
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al crear la llamada");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(createdLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl border border-gray-200 p-10">

        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <FaVideo className="text-indigo-600 text-4xl" />
          Crear nueva sesión de videollamada
        </h2>

        <div className="space-y-6">

          {/* Cursos */}
          <div>
            <label className="block font-semibold mb-2">Curso</label>
            <select
              className="select select-bordered w-full bg-white"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Selecciona un curso...</option>
              {courses.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.titulo}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label className="block font-semibold mb-2">Título</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Ej. Clase 3 - Introducción a Redes"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-semibold mb-2">Descripción</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Describe brevemente tu sesión..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Hora inicio</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Hora fin</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
              />
            </div>
          </div>

          {/* Botón */}
          <button
            className={`btn btn-primary w-full mt-3 ${loading ? "loading" : ""}`}
            onClick={handleCreateCall}
          >
            {loading ? "Creando..." : "Crear enlace"}
          </button>
        </div>

        {/* Resultado */}
        {createdLink && (
          <div className="mt-10 bg-indigo-50 border border-indigo-300 p-6 rounded-2xl">
            <h3 className="text-indigo-700 font-semibold mb-3 flex items-center gap-3">
              <FaCheck className="text-indigo-700" />
              Sesión creada con éxito
            </h3>

            <div className="bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-center">
              <code className="text-sm break-all text-gray-700">{createdLink}</code>

              <div className="flex gap-3 ml-4">
                <button className="btn btn-sm btn-outline" onClick={handleCopy}>
                  {copied ? "Copiado!" : <FaCopy />}
                </button>

                <Link to={createdLink} className="btn btn-sm btn-primary">
                  IR
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
