import React from "react";

const HomeStudent = () => {
    return (
        <main className="container mx-auto py-8 font-[Poppins]">
            {/* Hero del estudiante */}
            <section className="text-center mb-10">
                <h1 className="text-3xl font-semibold mb-2">
                    ¡Hola, Estudiante! 👋
                </h1>
                <p className="text-base opacity-80 mb-6">
                    Accede a tus sesiones de videollamada programadas y únete a clases en vivo.
                </p>

                {/* Estadísticas */}
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <div className="stat bg-base-200 rounded-2xl p-4 shadow w-40">
                        <div className="text-3xl font-bold">5</div>
                        <div className="text-sm opacity-70">Cursos Inscritos</div>
                    </div>
                    <div className="stat bg-base-200 rounded-2xl p-4 shadow w-40">
                        <div className="text-3xl font-bold">3</div>
                        <div className="text-sm opacity-70">Sesiones Hoy</div>
                    </div>
                </div>
            </section>

            {/* Sesión en Vivo */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <i className="fas fa-broadcast-tower"></i> Sesión en Vivo
                    </h2>
                    <span className="badge badge-error text-white font-medium">EN VIVO</span>
                </div>

                <div className="session-card bg-base-200 rounded-2xl p-5 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="session-info">
                        <h5 className="text-lg font-medium">
                            Matemáticas Avanzadas — Álgebra Lineal
                        </h5>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm opacity-80">
                            <span><i className="fas fa-calendar"></i> Hoy</span>
                            <span><i className="fas fa-clock"></i> 3:00 PM - 4:30 PM</span>
                            <span><i className="fas fa-chalkboard-teacher"></i> Instructor: Juan Pérez</span>
                            <span><i className="fas fa-users"></i> 24 estudiantes conectados</span>
                        </div>
                        <div className="mt-3">
                            <span className="badge badge-success text-white">Sesión activa - Únete ahora</span>
                        </div>
                    </div>
                    <button className="btn btn-primary w-full sm:w-auto">
                        <i className="fas fa-video me-2"></i> Unirse a Clase
                    </button>
                </div>
            </section>

            {/* Mis Cursos */}
            <section>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <i className="fas fa-graduation-cap"></i> Mis Cursos
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Inglés */}
                    <div className="course-card bg-base-200 rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition">
                        <div className="text-4xl mb-3">
                            <i className="fas fa-language"></i>
                        </div>
                        <h5 className="text-lg font-semibold">Inglés Conversacional</h5>
                        <p className="opacity-70 text-sm">Lunes y Miércoles - 6:00 PM</p>
                        <div className="mt-2 mb-3 text-sm opacity-80">
                            <i className="fas fa-video"></i> 12 sesiones/mes
                        </div>
                        <button className="btn btn-primary w-full">Ver Sesiones</button>
                    </div>

                    {/* Programación Web */}
                    <div className="course-card bg-base-200 rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition">
                        <div className="text-4xl mb-3">
                            <i className="fas fa-code"></i>
                        </div>
                        <h5 className="text-lg font-semibold">Programación Web</h5>
                        <p className="opacity-70 text-sm">Martes y Jueves - 2:00 PM</p>
                        <div className="mt-2 mb-3 text-sm opacity-80">
                            <i className="fas fa-video"></i> 8 sesiones/mes
                        </div>
                        <button className="btn btn-primary w-full">Ver Sesiones</button>
                    </div>

                    {/* Diseño Gráfico */}
                    <div className="course-card bg-base-200 rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition">
                        <div className="text-4xl mb-3">
                            <i className="fas fa-palette"></i>
                        </div>
                        <h5 className="text-lg font-semibold">Diseño Gráfico</h5>
                        <p className="opacity-70 text-sm">Jueves - 10:00 AM</p>
                        <div className="mt-2 mb-3 text-sm opacity-80">
                            <i className="fas fa-video"></i> 4 sesiones/mes
                        </div>
                        <button className="btn btn-primary w-full">Ver Sesiones</button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomeStudent;
