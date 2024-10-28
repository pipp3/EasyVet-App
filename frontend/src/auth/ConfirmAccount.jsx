import Layout from "./Layout";
import { Link } from "react-router-dom";

export default function ConfirmAccount() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div>
            <h1 className="text-2xl font-semibold text-blue-600">
              ¡Cuenta Confirmada!
            </h1>
            <p className="mt-4 text-gray-700">
              Tu cuenta ha sido confirmada exitosamente. Puedes iniciar sesión
              ahora.
            </p>
          </div>

          <Link
            to="/login"
            className="inline-block mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    </Layout>
  );
}
