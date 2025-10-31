//  REGISTRO MANUAL
import { useState } from "react";
import { Link } from "react-router";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* REGISTER FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <span className="text-3xl font-bold font-mono bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wider">
              SmartWeb
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {/* error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          ) */}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Bienvenido de nuevo</h2>
                  <p className="text-sm opacity-70">
                    Crea una cuenta para poder adquirir mas conocimiento
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Nombre</span>
                    </label>
                    <input
                      type="string"
                      placeholder="Juan"
                      className="input input-bordered w-full"
                      value={registerData.nombre}
                      onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Apellido</span>
                    </label>
                    <input
                      type="string"
                      placeholder="Peréz"
                      className="input input-bordered w-full"
                      value={registerData.apellido}
                      onChange={(e) => setRegisterData({ ...registerData, apellido: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@ejemplo.com"
                      className="input input-bordered w-full"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Contraseña</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={isPending}>
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Registrando...
                      </>
                    ) : (
                      "Registrarse"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Tienes una cuenta?{" "}
                      <Link to="/login" className="text-primary hover:underline text-blue-600 font-bold">
                        Ingresa
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/logo.png" alt="SmartWeb" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <p className="opacity-70">
                Aprende a traves de videollamadas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
