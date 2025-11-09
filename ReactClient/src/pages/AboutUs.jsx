import React from "react";

const AboutUs = () => {
    return (
        <main className="container mx-auto px-4 py-10 font-[Poppins]">
            {/* Sección principal */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Acerca de SMARTWEB 🌐</h1>
                <p className="text-base opacity-80 max-w-3xl mx-auto">
                    Somos el equipo dedicado a llevar la educación virtual a nuevas alturas,
                    combinando tecnología de vanguardia con metodologías de enseñanza efectivas.
                    Conoce a los desarrolladores detrás de esta plataforma.
                </p>
            </div>

            {/* Sección del equipo */}
            <section>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold flex justify-center items-center gap-2">
                        <i className="fas fa-users"></i> Equipo de Desarrollo
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Esmeralda */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FEsmeralda.jpeg?alt=media&token=3cc316ba-fd2a-4196-b3e2-562eee1d7ec3"
                                alt="Foto de Esmeralda"
                                className="w-28 h-28 rounded-full mb-3"
                            />
                            <h3 className="font-semibold text-lg">Esmeralda García</h3>
                            <p className="opacity-70">Desarrolladora FrontEnd</p>
                            <div className="flex justify-center gap-3 text-xl mt-2 opacity-80">
                                <i className="fab fa-php"></i>
                                <i className="fab fa-laravel"></i>
                                <i className="fas fa-database"></i>
                            </div>
                            <p className="mt-3 opacity-70">
                                Desarrollo de interfaces del sitio.
                            </p>
                        </div>
                    </div>

                    {/* Mario */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FMario.jpeg?alt=media&token=5a0b1306-f31b-4327-89d8-e3fc1aded579"
                                alt="Foto de Mario Hernández"
                                className="w-28 h-28 rounded-full mb-3"
                            />
                            <h3 className="font-semibold text-lg">Mario Hernández</h3>
                            <p className="opacity-70">Desarrollador FrontEnd</p>
                            <div className="flex justify-center gap-3 text-xl mt-2 opacity-80">
                                <i className="fab fa-html5"></i>
                                <i className="fab fa-css3-alt"></i>
                                <i className="fab fa-js"></i>
                            </div>
                            <p className="mt-3 opacity-70">
                                Implementación de la interfaz de usuario para estudiantes.
                            </p>
                        </div>
                    </div>

                    {/* Jorge */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2F171405822-default-avatar-photo-placeholder-gray-profile-picture-icon-business-man-illustration.jpg?alt=media&token=e9497eef-93c9-4226-9601-044df19218b3"
                                alt="Foto de Jorge Cisneros"
                                className="w-28 h-28 rounded-full mb-3"
                            />
                            <h3 className="font-semibold text-lg">Jorge Cisneros</h3>
                            <p className="opacity-70">Desarrollador BackEnd</p>
                            <div className="flex justify-center gap-3 text-xl mt-2 opacity-80">
                                <i className="fas fa-server"></i>
                                <i className="fas fa-shield-alt"></i>
                                <i className="fas fa-code-branch"></i>
                            </div>
                            <p className="mt-3 opacity-70">
                                Gestión de bases de datos y seguridad de la información.
                            </p>
                        </div>
                    </div>

                    {/* Fernando */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <div className="card-body items-center text-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/dulcesabor-c6f5a.appspot.com/o/Imagenes%20de%20CLOUD%20COMPUTING%2FFernando.jpeg?alt=media&token=67f48dd0-0446-483f-b611-18167587b8f0"
                                alt="Foto de Fernando Gómez"
                                className="w-28 h-28 rounded-full mb-3"
                            />
                            <h3 className="font-semibold text-lg">Fernando Gómez</h3>
                            <p className="opacity-70">QA Tester & UX</p>
                            <div className="flex justify-center gap-3 text-xl mt-2 opacity-80">
                                <i className="fas fa-bug"></i>
                                <i className="fas fa-lightbulb"></i>
                                <i className="fas fa-hand-pointer"></i>
                            </div>
                            <p className="mt-3 opacity-70">
                                Control de calidad y diseño de la experiencia de usuario.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
