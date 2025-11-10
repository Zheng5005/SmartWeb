import { useState } from "react"

export default function CreateCourseModal({ onClose, onCreate }) {
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const handleSubmit = () => {
        if (!titulo.trim() || !descripcion.trim()) return

        let NuevoCurso = {
          id: 45, // Quitar
          titulo: titulo,
          descripcion: descripcion,
          estado: "activo" //Quitar
        }

        onCreate(NuevoCurso)
        setTitulo("")
        setDescripcion("")
    }

    return (
        <dialog open className="modal modal-open">
            <div className="modal-box rounded-xl max-w-lg">
                <h3 className="font-bold text-2xl mb-4 text-primary">🆕 Crear Nuevo Curso</h3>

                <div className="form-control mb-4">
                    <label className="label font-semibold">Título del Curso</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Ej: Programación en Go"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label font-semibold">Descripción</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Breve descripción del curso..."
                        rows="4"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>

                <div className="modal-action">
                    <button className="btn btn-outline" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Crear Curso
                    </button>
                </div>
            </div>
        </dialog>
    )
}

