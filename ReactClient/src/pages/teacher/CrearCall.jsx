import React, { useState, useEffect } from "react";
import { FaVideo, FaCopy, FaCheck } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

export default function CreateCallPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Cargar cursos activos del profesor
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/courses/active", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error al obtener cursos:", err);
      }
    };
    fetchCourses();
  }, []);

  // 🔹 Crear llamada
  const handleCreateCall = async () => {
    if (!selectedCourse) {
      alert("Por favor selecciona un curso");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/hope/createCall?curso_id=${selectedCourse}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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
    navigator.clipboard.writeText(
      `${window.location.origin}/call/${createdLink}/${selectedCourse}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaVideo className="text-primary" />
          Crear enlace de videollamada
        </h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Selecciona un curso</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Selecciona --</option>
            {courses.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.titulo}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          onClick={handleCreateCall}
          disabled={loading}
        >
          {loading ? "Creando llamada..." : "Crear enlace"}
        </button>

        {createdLink && (
          <div className="mt-6 p-4 bg-success bg-opacity-10 rounded-xl border border-success/30">
            <h3 className="font-semibold text-success mb-2 flex items-center gap-2">
              <FaCheck /> Llamada creada con éxito
            </h3>
            <div className="flex items-center justify-between bg-base-300 p-2 rounded-md">
              <code className="text-sm break-all">
                {`${window.location.origin}/call/${createdLink}/${selectedCourse}`}
              </code>
              <button
                className="btn btn-sm btn-outline ml-2"
                onClick={handleCopy}
              >
                {copied ? "Copiado!" : <FaCopy />}
              </button>

              <Link
                to={`/call/${createdLink}/${selectedCourse}`}
                className="btn btn-sm btn-outline ml-2"
              >
                IR
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

