"use client"

const HomeStudent = () => {
  return (
    <main className="container mx-auto py-10 px-6 font-sans max-w-6xl bg-gray-50 min-h-screen">
      {/* Header de bienvenida */}
      <section className="text-center mb-14">
        <h1 className="text-4xl font-semibold text-gray-800 mb-3">👋 ¡Hola, Estudiante!</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Accede a tus clases en vivo, revisa tus cursos inscritos y sigue aprendiendo cada día.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="stat bg-white rounded-2xl p-6 shadow border border-gray-100 hover:shadow-md transition">
            <div className="stat-value text-3xl font-bold text-indigo-600">5</div>
            <div className="stat-desc text-gray-600 font-medium">Cursos Inscritos</div>
          </div>
          <div className="stat bg-white rounded-2xl p-6 shadow border border-gray-100 hover:shadow-md transition">
            <div className="stat-value text-3xl font-bold text-indigo-600">3</div>
            <div className="stat-desc text-gray-600 font-medium">Sesiones Hoy</div>
          </div>
        </div>
      </section>

      {/* Sesión en Vivo */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">🎥 Sesión en Vivo</h2>
          <span className="bg-red-100 text-red-600 font-medium px-3 py-1 rounded-full text-sm border border-red-200">
            EN VIVO
          </span>
        </div>

        <div className="card bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition">
          <div className="card-body flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Matemáticas Avanzadas — Álgebra Lineal
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>📅 Hoy</span>
                <span>🕐 3:00 PM - 4:30 PM</span>
                <span>👨‍🏫 Juan Pérez</span>
                <span>👥 24 estudiantes</span>
              </div>
              <div className="mt-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                  Sesión activa
                </span>
              </div>
            </div>
            <button className="btn btn-primary w-full md:w-auto shadow-sm hover:shadow-md">
              🚀 Unirse a Clase
            </button>
          </div>
        </div>
      </section>

      {/* Mis Cursos */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">📚 Mis Cursos</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🗣️",
              title: "Inglés Conversacional",
              schedule: "Lunes y Miércoles - 6:00 PM",
              sessions: "12 sesiones/mes",
            },
            {
              icon: "💻",
              title: "Programación Web",
              schedule: "Martes y Jueves - 2:00 PM",
              sessions: "8 sesiones/mes",
            },
            {
              icon: "🎨",
              title: "Diseño Gráfico",
              schedule: "Jueves - 10:00 AM",
              sessions: "4 sesiones/mes",
            },
          ].map((course, idx) => (
            <div
              key={idx}
              className="card bg-white rounded-2xl shadow border border-gray-100 hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div className="card-body items-center text-center p-6">
                <div className="text-5xl mb-3">{course.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.schedule}</p>
                <div className="mt-2 mb-4 text-sm text-gray-500">📹 {course.sessions}</div>
                <button className="btn btn-outline btn-primary btn-sm w-full">Ver Sesiones</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomeStudent
