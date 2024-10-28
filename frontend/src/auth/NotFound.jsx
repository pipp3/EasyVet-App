import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Página no encontrada
        </p>
        <p className="mt-2 text-gray-600">
          Lo sentimos, no hemos podido encontrar la página que estás buscando.
        </p>
        <Link
          to="/login"
          className="inline-block mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
