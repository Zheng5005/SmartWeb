export default function PrivacyPolicy() {
    return (
        <div className="bg-base-200 min-h-screen">
            {/* Header */}
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
                    <p className="text-lg opacity-90">
                        Tu privacidad es nuestra prioridad. Entiende cómo protegemos y utilizamos tu información.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-primary/5 rounded-xl shadow-lg p-8 -mt-12 relative mb-8">
                    {/* Last Updated Badge */}
                    <div className="badge badge-info absolute -top-4 right-8">⏱️ Última actualización: 15 de Marzo, 2024</div>

                    {/* GDPR Badge */}
                    <div className="badge badge-accent mb-6">🛡️ Cumplimiento GDPR y Leyes Internacionales</div>

                    {/* Section 1 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">1. Introducción</h2>
                    <p className="mb-6 text-base-content/80">
                        En SMARTWEB nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, utilizamos y
                        protegemos tu información personal cuando utilizas nuestra plataforma educativa.
                    </p>

                    <div className="alert bg-base-100 border-l-4 border-accent mb-6">
                        <div className="font-bold">Transparencia:</div>
                        <div>
                            Creemos en la transparencia sobre el uso de tus datos. Esta política detalla claramente nuestras prácticas
                            de privacidad.
                        </div>
                    </div>

                    {/* Section 2 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        2. Información que Recopilamos
                    </h2>

                    <h3 className="text-lg font-semibold text-info mb-3">2.1 Información Personal</h3>
                    <div className="overflow-x-auto mb-6">
                        <table className="table table-zebra w-full bg-base-100">
                            <thead>
                                <tr className="bg-info text-white">
                                    <th>Tipo de Información</th>
                                    <th>Ejemplos</th>
                                    <th>Propósito</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-semibold">Información de registro</td>
                                    <td>Nombre, email, fecha de nacimiento</td>
                                    <td>Crear y gestionar tu cuenta</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Información académica</td>
                                    <td>Cursos, progreso, calificaciones</td>
                                    <td>Proporcionar servicios educativos</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Datos de videollamada</td>
                                    <td>Video, audio, chat durante sesiones</td>
                                    <td>Facilitar clases en tiempo real</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Información técnica</td>
                                    <td>IP, navegador, dispositivo</td>
                                    <td>Mejorar seguridad y rendimiento</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-lg font-semibold text-info mb-3">2.2 Información de Instructores</h3>
                    <p className="mb-3 text-base-content/80">Los instructores proporcionan información adicional como:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Certificaciones y cualificaciones</li>
                        <li>Información bancaria para pagos</li>
                        <li>Material educativo y currículum</li>
                        <li>Historial de enseñanza</li>
                    </ul>

                    {/* Section 3 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        3. Cómo Utilizamos tu Información
                    </h2>

                    <h3 className="text-lg font-semibold text-info mb-3">3.1 Propósitos Principales</h3>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>
                            <strong>Proveer servicios educativos:</strong> Conectar estudiantes con instructores
                        </li>
                        <li>
                            <strong>Gestionar videollamadas:</strong> Facilitar sesiones en tiempo real
                        </li>
                        <li>
                            <strong>Procesar pagos:</strong> Gestionar transacciones seguras
                        </li>
                        <li>
                            <strong>Comunicaciones:</strong> Enviar notificaciones importantes
                        </li>
                        <li>
                            <strong>Mejora del servicio:</strong> Analizar uso para mejoras
                        </li>
                    </ul>

                    <h3 className="text-lg font-semibold text-info mb-3">3.2 Base Legal</h3>
                    <p className="mb-3 text-base-content/80">Procesamos tu información basándonos en:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>
                            <strong>Consentimiento:</strong> Cuando nos das permiso explícito
                        </li>
                        <li>
                            <strong>Contrato:</strong> Para proporcionar los servicios acordados
                        </li>
                        <li>
                            <strong>Interés legítimo:</strong> Para mejorar nuestros servicios
                        </li>
                        <li>
                            <strong>Obligación legal:</strong> Cuando la ley lo requiere
                        </li>
                    </ul>

                    {/* Section 4 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        4. Compartición de Información
                    </h2>

                    <h3 className="text-lg font-semibold text-info mb-3">4.1 Con Instructores</h3>
                    <p className="mb-3 text-base-content/80">Compartimos información limitada con instructores para:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Gestionar asistencia a clases</li>
                        <li>Proporcionar retroalimentación académica</li>
                        <li>Coordinar sesiones de videollamada</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-info mb-3">4.2 Proveedores de Servicios</h3>
                    <p className="mb-3 text-base-content/80">Trabajamos con terceros confiables como:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>
                            <strong>GetStream:</strong> Para servicios de videollamada y chat
                        </li>
                        <li>
                            <strong>Proveedores de pago:</strong> Para procesar transacciones
                        </li>
                        <li>
                            <strong>Servicios de hosting:</strong> Para almacenamiento seguro
                        </li>
                    </ul>

                    <h3 className="text-lg font-semibold text-info mb-3">4.3 Requisitos Legales</h3>
                    <p className="mb-6 text-base-content/80">
                        Podemos divulgar información cuando la ley lo requiera o para proteger nuestros derechos legales.
                    </p>

                    {/* Section 5 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        5. Seguridad de Datos
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="card bg-base-100 border border-base-300 text-center p-6">
                            <div className="text-4xl mb-3">🔒</div>
                            <h4 className="font-bold mb-2">Encriptación</h4>
                            <p className="text-sm text-base-content/70">Datos encriptados en tránsito y en reposo</p>
                        </div>
                        <div className="card bg-base-100 border border-base-300 text-center p-6">
                            <div className="text-4xl mb-3">🛡️</div>
                            <h4 className="font-bold mb-2">Autenticación</h4>
                            <p className="text-sm text-base-content/70">Verificación de dos factores disponible</p>
                        </div>
                        <div className="card bg-base-100 border border-base-300 text-center p-6">
                            <div className="text-4xl mb-3">👤</div>
                            <h4 className="font-bold mb-2">Acceso Controlado</h4>
                            <p className="text-sm text-base-content/70">Acceso restringido a datos sensibles</p>
                        </div>
                        <div className="card bg-base-100 border border-base-300 text-center p-6">
                            <div className="text-4xl mb-3">🔄</div>
                            <h4 className="font-bold mb-2">Copias de Seguridad</h4>
                            <p className="text-sm text-base-content/70">Backups regulares y seguros</p>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        6. Retención de Datos
                    </h2>
                    <p className="mb-3 text-base-content/80">
                        Mantenemos tu información solo durante el tiempo necesario para los fines descritos:
                    </p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>
                            <strong>Datos de cuenta:</strong> Mientras tu cuenta esté activa
                        </li>
                        <li>
                            <strong>Datos de sesiones:</strong> Hasta 2 años para fines educativos
                        </li>
                        <li>
                            <strong>Datos de pago:</strong> Según requerimientos legales fiscales
                        </li>
                        <li>
                            <strong>Grabaciones:</strong> Solo con consentimiento explícito
                        </li>
                    </ul>

                    {/* Section 7 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">7. Tus Derechos</h2>

                    <h3 className="text-lg font-semibold text-info mb-3">7.1 Derechos del Usuario</h3>
                    <p className="mb-3 text-base-content/80">Tienes derecho a:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>
                            <strong>Acceso:</strong> Solicitar copia de tus datos
                        </li>
                        <li>
                            <strong>Rectificación:</strong> Corregir información inexacta
                        </li>
                        <li>
                            <strong>Eliminación:</strong> Solicitar borrado de datos
                        </li>
                        <li>
                            <strong>Portabilidad:</strong> Obtener datos en formato reutilizable
                        </li>
                        <li>
                            <strong>Oposición:</strong> Oponerte al procesamiento de datos
                        </li>
                    </ul>

                    <h3 className="text-lg font-semibold text-info mb-3">7.2 Ejercer tus Derechos</h3>
                    <p className="mb-6 text-base-content/80">
                        Para ejercer cualquiera de estos derechos, contáctanos a través de los medios proporcionados al final de
                        esta política.
                    </p>

                    {/* Section 8 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        8. Cookies y Tecnologías Similares
                    </h2>
                    <p className="mb-3 text-base-content/80">Utilizamos cookies para:</p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Mantener sesiones de usuario seguras</li>
                        <li>Recordar preferencias de usuario</li>
                        <li>Analizar uso de la plataforma</li>
                        <li>Mejorar experiencia del usuario</li>
                    </ul>

                    {/* Section 9 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        9. Transferencias Internacionales
                    </h2>
                    <p className="mb-3 text-base-content/80">
                        Como plataforma internacional, tus datos pueden ser procesados en diferentes países. Garantizamos protección
                        adecuada mediante:
                    </p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Cláusulas contractuales estándar</li>
                        <li>Certificaciones de privacidad</li>
                        <li>Estándares de seguridad uniformes</li>
                    </ul>

                    {/* Section 10 */}
                    <h2 className="text-2xl font-bold border-b-2 border-primary text-primary mt-8 mb-4 pb-2">
                        10. Cambios en esta Política
                    </h2>
                    <p className="mb-3 text-base-content/80">
                        Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos mediante:
                    </p>
                    <ul className="list-disc list-inside mb-6 text-base-content/80 space-y-2">
                        <li>Notificaciones en la plataforma</li>
                        <li>Email a la dirección registrada</li>
                        <li>Actualización de la fecha en esta página</li>
                    </ul>

                    {/* Contact Info */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 text-white rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">📞 Contacto y Ejercicio de Derechos</h3>
                        <p className="mb-3">Si tienes preguntas sobre esta política o deseas ejercer tus derechos de privacidad:</p>
                        <p className="mb-2">📧 privacidad@smartweb.edu</p>
                        <p className="mb-2">📱 +1 (555) 123-4567</p>
                        <p>📍 Oficina de Protección de Datos, SMARTWEB International</p>
                    </div>

                    {/* Important Note */}
                    <div className="alert bg-base-100 border border-info text-info mb-6">
                        <span>ℹ️</span>
                        <div>
                            <h3 className="font-bold">Nota importante:</h3>
                            <p>
                                Esta política se complementa con nuestros Términos de Servicio. Te recomendamos leer ambos documentos
                                completamente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
