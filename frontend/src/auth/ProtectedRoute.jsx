import { Navigate, Outlet, useParams } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useParams();

  // Si el token no existe, redirige a una página de error o inicio de sesión
  if (!token) {
    return <Navigate to="*" replace />;
  }

  // Si el token existe, permite el acceso a la ruta
  return <Outlet />;
};

export default ProtectedRoute;
