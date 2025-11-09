import React from "react";

export default function HomeTeacher() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="container mx-auto py-10 px-5">
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Panel del Docente</h1>
          <p className="text-blue-100 mb-6">
            Gestiona tus cursos, sesiones y estudiantes de manera eficiente.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="stat bg-white/10 rounded-xl p-4 flex-1 text-center">
              <div className="stat-value text-3xl font-bold">12</div>
              <div className="text-sm opacity-80">Cursos Activos</div>
            </div>
            <div className="stat bg-white/10 rounded-xl p-4 flex-1 text-center">
              <div className="stat-value text-3xl font-bold">142</div>
              <div className="text-sm opacity-80">Estudiantes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <section className="container mx-auto px-5 mb-16">
        <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
          <i className="fa-solid fa-bolt"></i> Acciones Rápidas
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <div className="flex justify-center mb-3">
                <div className="bg-primary text-white p-3 rounded-full">
                  <i className="fa-solid fa-plus text-xl"></i>
                </div>
              </div>
              <h3 className="card-title justify-center">Crear Nuevo Curso</h3>
              <p className="text-center text-sm text-gray-500">
                Diseña un nuevo curso virtual con módulos, materiales y
                evaluaciones personalizadas.
              </p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full">Crear Curso</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <div className="flex justify-center mb-3">
                <div className="bg-primary text-white p-3 rounded-full">
                  <i className="fa-solid fa-video text-xl"></i>
                </div>
              </div>
              <h3 className="card-title justify-center">Programar Videollamada</h3>
              <p className="text-center text-sm text-gray-500">
                Organiza sesiones en vivo con tus estudiantes y comparte
                materiales en tiempo real.
              </p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full">
                  Programar Sesión
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <div className="flex justify-center mb-3">
                <div className="bg-primary text-white p-3 rounded-full">
                  <i className="fa-solid fa-tasks text-xl"></i>
                </div>
              </div>
              <h3 className="card-title justify-center">Revisar Tareas</h3>
              <p className="text-center text-sm text-gray-500">
                Revisa y califica las tareas enviadas por tus estudiantes con
                herramientas integradas.
              </p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full">Revisar Tareas</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas sesiones */}
      <section className="container mx-auto px-5 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
            <i className="fa-solid fa-calendar-days"></i> Próximas Sesiones
          </h2>
          <a href="#" className="text-primary hover:underline font-semibold">
            Ver todas
          </a>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Matemáticas Avanzadas - Álgebra Lineal",
              date: "Lunes, 10 Febrero",
              time: "4:00 PM - 5:30 PM",
              students: 24,
            },
            {
              title: "Introducción a Física - Leyes de Newton",
              date: "Miércoles, 12 Febrero",
              time: "2:00 PM - 3:30 PM",
              students: 18,
            },
            {
              title: "Fundamentos de Programación - Funciones",
              date: "Viernes, 14 Febrero",
              time: "7:00 PM - 8:30 PM",
              students: 32,
            },
          ].map((session, idx) => (
            <div
              key={idx}
              className="bg-base-100 shadow-md border-l-4 border-primary p-5 rounded-xl flex justify-between items-center hover:shadow-lg"
            >
              <div>
                <h3 className="font-semibold">{session.title}</h3>
                <p className="text-sm text-gray-500 flex flex-wrap gap-4 mt-1">
                  <span>
                    <i className="fa-solid fa-calendar"></i> {session.date}
                  </span>
                  <span>
                    <i className="fa-solid fa-clock"></i> {session.time}
                  </span>
                  <span>
                    <i className="fa-solid fa-user-group"></i>{" "}
                    {session.students} estudiantes
                  </span>
                </p>
              </div>
              <button className="btn btn-outline btn-primary">
                <i className="fa-solid fa-play me-2"></i> Iniciar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sesiones realizadas */}
      <section className="container mx-auto px-5 mb-16">
        <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
          <i className="fa-solid fa-history"></i> Sesiones Realizadas
        </h2>

        <div className="space-y-4">
          {[
            {
              title: "Matemáticas Avanzadas - Vectores y Matrices",
              date: "Lunes, 3 Febrero",
              time: "4:00 PM - 5:30 PM",
            },
            {
              title: "Introducción a Física - Cinemática",
              date: "Miércoles, 5 Febrero",
              time: "2:00 PM - 3:30 PM",
            },
            {
              title: "Fundamentos de Programación - Estructuras de Control",
              date: "Viernes, 7 Febrero",
              time: "7:00 PM - 8:30 PM",
            },
          ].map((session, idx) => (
            <div
              key={idx}
              className="bg-base-100 border-l-4 border-gray-400 p-5 rounded-xl shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{session.title}</h3>
                <p className="text-sm text-gray-500 flex flex-wrap gap-4 mt-1">
                  <span>
                    <i className="fa-solid fa-calendar"></i> {session.date}
                  </span>
                  <span>
                    <i className="fa-solid fa-clock"></i> {session.time}
                  </span>
                  <span className="text-success">
                    <i className="fa-solid fa-check-circle"></i> Completada
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
