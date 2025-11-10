const HomeStudent = () => {
    return (
        <main className="container mx-auto py-8 px-4 font-sans max-w-6xl">
            <section className="mb-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-3">¡Hola, Estudiante!</h1>
                    <p className="text-lg opacity-70 mb-8 max-w-2xl mx-auto">
                        Accede a tus sesiones de videollamada programadas y únete a clases en vivo.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <div className="stat bg-base-100 rounded-xl p-6 shadow border border-base-200">
                            <div className="stat-value text-3xl font-bold text-primary">5</div>
                            <div className="stat-desc">Cursos Inscritos</div>
                        </div>
                        <div className="stat bg-base-100 rounded-xl p-6 shadow border border-base-200">
                            <div className="stat-value text-3xl font-bold text-primary">3</div>
                            <div className="stat-desc">Sesiones Hoy</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sesión en Vivo */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Sesión en Vivo</h2>
                    <span className="badge badge-error text-white font-semibold">EN VIVO</span>
                </div>

                <div className="card bg-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden">
                    <div className="card-body gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="card-title text-lg mb-3">Matemáticas Avanzadas — Álgebra Lineal</h3>
                            <div className="flex flex-wrap gap-4 text-sm opacity-70">
                                <span className="flex items-center gap-1">📅 Hoy</span>
                                <span className="flex items-center gap-1">🕐 3:00 PM - 4:30 PM</span>
                                <span className="flex items-center gap-1">👨‍🏫 Juan Pérez</span>
                                <span className="flex items-center gap-1">👥 24 estudiantes</span>
                            </div>
                            <div className="mt-4">
                                <span className="badge badge-success text-white font-medium">Sesión activa</span>
                            </div>
                        </div>
                        <button className="btn btn-primary w-full md:w-auto md:flex-shrink-0">Unirse a Clase</button>
                    </div>
                </div>
            </section>

            {/* Mis Cursos */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Mis Cursos</h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        { icon: "🎨", title: "Diseño Gráfico", schedule: "Jueves - 10:00 AM", sessions: "4 sesiones/mes" },
                    ].map((course, idx) => (
                        <div
                            key={idx}
                            className="card bg-base-100 rounded-xl shadow border border-base-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="card-body items-center text-center">
                                <div className="text-5xl mb-3">{course.icon}</div>
                                <h3 className="card-title text-lg">{course.title}</h3>
                                <p className="opacity-70 text-sm">{course.schedule}</p>
                                <div className="mt-2 mb-4 text-sm opacity-70">📹 {course.sessions}</div>
                                <button className="btn btn-primary btn-sm w-full">Ver Sesiones</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HomeStudent
