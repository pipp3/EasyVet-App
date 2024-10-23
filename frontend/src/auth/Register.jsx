import Layout from "./Layout";
export default function Register() {
  return (
    <div>
      <Layout>
        <section className="bg-[#7AB2D3] rounded-md">
          <div className="flex justify-center">
          
            <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
              <div className="w-full">
                <h1 className="text-3xl font-semibold tracking-wider uppercase font-serif text-white capitaliz">
                  Registro
                </h1>

                <p className="mt-4 text-white">
                  Let’s get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </p>

                

                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm text-white ">
                      Nombre(s)
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="block w-full px-2 py-3 mt-2 text-gray-800 font-sans placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white ">
                      Apellido(s)
                    </label>
                    <input
                      type="text"
                      placeholder="Snow"
                      className="block w-full px-2 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white">
                      Celular
                    </label>
                    <input
                      type="text"
                      placeholder="+56 9 XXXX XXXX"
                      className="block w-full px-2 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white ">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="johnsnow@example.com"
                      className="block w-full px-2 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white ">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="block w-full px-2 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white ">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="block w-full px-2 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    <span className="uppercase font-semibold">Registrarse</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
