import Layout from "./Layout";
export default function Register() {
  return (
    <div>
      <Layout>
        <section className="rounded-md p-8">
          <div className="flex justify-center">
            <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 bg-white rounded-lg shadow-lg">
              <div className="w-full">
                <h1 className="text-3xl font-semibold tracking-wider font-serif text-blue-600 capitalize">
                  Registro
                </h1>
                <p className="mt-4 text-gray-700">
                  Complete los siguientes datos para crear su cuenta y comenzar a configurar a gestionar citas para su mascota.
                </p>

                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="first-name">
                      Nombre(s)
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      placeholder="John"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      required
                      aria-label="Nombre(s)"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="last-name">
                      Apellido(s)
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      placeholder="Snow"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      required
                      aria-label="Apellido(s)"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="phone">
                      Celular
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+56 9 XXXX XXXX"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      pattern="^\+?56\s?9\s?\d{4}\s?\d{4}$"
                      title="Formato: +56 9 XXXX XXXX"
                      required
                      aria-label="Celular"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="johnsnow@example.com"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      required
                      aria-label="Email"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="password">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      minLength="8"
                      required
                      aria-label="Contraseña"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="confirm-password">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      placeholder="Confirm your password"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      minLength="8"
                      required
                      aria-label="Confirmar contraseña"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 mt-4">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
                    >
                      <span className="uppercase font-semibold">Registrarse</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
