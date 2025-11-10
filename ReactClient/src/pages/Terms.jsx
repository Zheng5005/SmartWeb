export default function Terms() {
    return (
        <div className="bg-base-200 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Términos de Servicio</h1>
                    <p className="text-lg opacity-90">
                        Por favor, lee detenidamente nuestros términos y condiciones antes de utilizar nuestra plataforma educativa.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className=" rounded-xl shadow-lg p-8 -mt-12 relative mb-8">
                    {/* Last Updated Badge */}
                    <div className="badge badge-info absolute -top-4 right-8">⏱️ Última actualización: 15 de Marzo, 2024</div>

                    {/* Section 1 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        1. Aceptación de los Términos
                    </h2>
                    <p className="mb-6 text-base-content/80">
                        Al acceder y utilizar SMARTWEB ("la Plataforma"), aceptas cumplir con estos Términos de Servicio y nuestra
                        Política de Privacidad. Si no estás de acuerdo con alguno de estos términos, no podrás utilizar nuestros
                        servicios.
                    </p>

                    <div className="alert bg-base-100 border-l-4 border-accent mb-6">
                        <div className="font-bold">Importante:</div>
                        <div>
                            Estos términos constituyen un acuerdo legalmente vinculante entre tú y SMARTWEB. Te recomendamos leerlos
                            cuidadosamente.
                        </div>
                    </div>

                    {/* Section 2 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        2. Descripción del Servicio
                    </h2>
                    <p className="mb-6 text-base-content/80">
                        SMARTWEB es una plataforma educativa internacional que conecta estudiantes con instructores calificados a
                        través de sesiones de videollamada en tiempo real.
                    </p>

                    <h3 className="text-lg font-semibold text-info mb-3">2.1 Servicios Ofrecidos</h3>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Videollamadas grupales educativas</li>
                        <li>Chat en tiempo real durante las sesiones</li>
                        <li>Calendarización de clases virtuales</li>
                        <li>Gestión de cursos y estudiantes</li>
                        <li>Sistema de notificaciones</li>
                    </ul>

                    {/* Section 3 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        3. Registro y Cuenta
                    </h2>

                    <h3 className="text-lg font-semibold text-info mb-3">3.1 Elegibilidad</h3>
                    <p className="mb-6 text-base-content/80">
                        Debes tener al menos 13 años de edad para utilizar la Plataforma. Los usuarios menores de 18 años necesitan
                        consentimiento parental.
                    </p>

                    <h3 className="text-lg font-semibold text-info mb-3">3.2 Verificación de Instructores</h3>
                    <p className="mb-6 text-base-content/80">
                        Los instructores deben pasar por un proceso de verificación para garantizar su idoneidad y cualificaciones.
                    </p>

                    <h3 className="text-lg font-semibold text-info mb-3">3.3 Seguridad de la Cuenta</h3>
                    <p className="mb-6 text-base-content/80">
                        Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Notifica inmediatamente
                        cualquier uso no autorizado.
                    </p>

                    {/* Section 4 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        4. Conducta del Usuario
                    </h2>

                    <h3 className="text-lg font-semibold text-info mb-3">4.1 Conducta Prohibida</h3>
                    <p className="mb-3 text-base-content/80">No está permitido:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Compartir enlaces de sesiones con personas no autorizadas</li>
                        <li>Grabar sesiones sin consentimiento explícito</li>
                        <li>Realizar actividades fraudulentas o engañosas</li>
                        <li>Acosar o intimidar a otros usuarios</li>
                        <li>Distribuir contenido inapropiado o ilegal</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-info mb-3">4.2 Propiedad Intelectual</h3>
                    <p className="mb-6 text-base-content/80">
                        El contenido educativo proporcionado por los instructores es de su propiedad intelectual. Los estudiantes
                        pueden utilizarlo únicamente para fines educativos personales.
                    </p>

                    {/* Section 5 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        5. Sesiones de Videollamada
                    </h2>

                    <h3 className="text-lg font-semibold text-info mb-3">5.1 Calidad del Servicio</h3>
                    <p className="mb-6 text-base-content/80">
                        Nos esforzamos por mantener la calidad del servicio de videollamadas, pero no garantizamos disponibilidad
                        continua ni calidad perfecta debido a factores externos.
                    </p>

                    <h3 className="text-lg font-semibold text-info mb-3">5.2 Grabación de Sesiones</h3>
                    <p className="mb-6 text-base-content/80">
                        Las sesiones pueden ser grabadas únicamente con el consentimiento de todos los participantes y para fines
                        educativos legítimos.
                    </p>

                    {/* Section 6 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        6. Pagos y Facturación
                    </h2>

                    <h3 className="text-lg font-semibold text-info mb-3">6.1 Tarifas de Servicio</h3>
                    <p className="mb-6 text-base-content/80">
                        Los instructores establecen sus propias tarifas. SMARTWEB puede cobrar una comisión por el servicio de
                        intermediación.
                    </p>

                    <h3 className="text-lg font-semibold text-info mb-3">6.2 Reembolsos</h3>
                    <p className="mb-6 text-base-content/80">
                        Las políticas de reembolso están sujetas a los términos específicos de cada instructor y deben ser
                        claramente comunicadas.
                    </p>

                    {/* Section 7 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        7. Privacidad y Datos
                    </h2>
                    <p className="mb-6 text-base-content/80">
                        Tu privacidad es importante para nosotros. Consulta nuestra{" "}
                        <a href="/privacy" className="link link-info font-semibold">
                            Política de Privacidad
                        </a>{" "}
                        para más información sobre cómo manejamos tus datos.
                    </p>

                    {/* Section 8 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        8. Limitación de Responsabilidad
                    </h2>
                    <p className="mb-3 text-base-content/80">SMARTWEB no será responsable por:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Interrupciones temporales del servicio</li>
                        <li>Contenido educativo proporcionado por instructores</li>
                        <li>Problemas técnicos relacionados con el equipo del usuario</li>
                        <li>Disputas entre estudiantes e instructores</li>
                    </ul>

                    {/* Section 9 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        9. Modificaciones del Servicio
                    </h2>
                    <p className="mb-6 text-base-content/80">
                        Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento. Notificaremos
                        cambios significativos en estos términos.
                    </p>

                    {/* Section 10 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">10. Terminación</h2>
                    <p className="mb-6 text-base-content/80">
                        Podemos suspender o terminar tu acceso al servicio por violaciones de estos términos o conducta inapropiada.
                    </p>

                    {/* Section 11 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        11. Ley Aplicable
                    </h2>
                    <p className="mb-6 text-base-content/80">
                        Estos términos se rigen por las leyes internacionales aplicables y cualquier disputa será resuelta en los
                        tribunales competentes.
                    </p>

                    {/* Contact Info */}
                    <div className="bg-gradient-to-r from-primary to-info text-white rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">📞 Contacto</h3>
                        <p className="mb-3">Si tienes preguntas sobre estos Términos de Servicio, contáctanos:</p>
                        <p className="mb-2">📧 legal@smartweb.edu</p>
                        <p>📱 +1 (555) 123-4567</p>
                    </div>

                    {/* Important Note */}
                    <div className="alert bg-base-100 border border-info text-info">
                        <span>ℹ️</span>
                        <div>
                            <h3 className="font-bold">Nota importante:</h3>
                            <p>
                                Estos términos están disponibles en múltiples idiomas. En caso de discrepancia, la versión en español
                                prevalecerá.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
