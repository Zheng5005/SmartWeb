const AboutUs = () => {
    return (
        <main className="container mx-auto px-4 py-10 font-sans">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Acerca de SMARTWEB</h1>
                <p className="text-lg opacity-80 max-w-3xl mx-auto">
                    Somos el equipo dedicado a llevar la educación virtual a nuevas alturas, combinando tecnología de vanguardia
                    con metodologías de enseñanza efectivas. Conoce a los desarrolladores detrás de esta plataforma.
                </p>
            </div>

            {/* Sección del equipo */}
            <section>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">Equipo de Desarrollo</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            name: "Esmeralda García",
                            role: "Desarrolladora FrontEnd",
                            image:
                                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FEsmeralda.jpeg?alt=media&token=3cc316ba-fd2a-4196-b3e2-562eee1d7ec3",
                            desc: "Desarrollo de interfaces del sitio.",
                        },
                        {
                            name: "Mario Hernández",
                            role: "Desarrollador FrontEnd",
                            image:
                                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FMario.jpeg?alt=media&token=5a0b1306-f31b-4327-89d8-e3fc1aded579",
                            desc: "Implementación de la interfaz de usuario para estudiantes.",
                        },
                        {
                            name: "Jorge Cisneros",
                            role: "Desarrollador BackEnd",
                            image:
                                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2F171405822-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg?alt=media&token=e9497eef-93c9-4226-9601-044df19218b3",
                            desc: "Gestión de bases de datos y seguridad de la información.",
                        },
                        {
                            name: "Fernando Gómez",
                            role: "QA Tester & UX",
                            image:
                                "https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FFernando.jpeg?alt=media&token=67f48dd0-0446-483f-b611-18167587b8f0",
                            desc: "Control de calidad y diseño de la experiencia de usuario.",
                        },
                    ].map((member, idx) => (
                        <div
                            key={idx}
                            className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="card-body items-center text-center">
                                <img
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.name}
                                    className="w-28 h-28 rounded-full mb-4 object-cover"
                                />
                                <h3 className="font-bold text-lg">{member.name}</h3>
                                <p className="opacity-70 text-sm font-medium">{member.role}</p>
                                <p className="mt-3 opacity-70 text-sm">{member.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default AboutUs
