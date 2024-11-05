import { useNavigate } from 'react-router-dom';
import iziToast from "izitoast";
import { useEffect, useState } from 'react';
import axios from 'axios';
import "izitoast/dist/css/iziToast.css";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/verify", {
          withCredentials: true, // Asegura que la cookie `HttpOnly` sea enviada
        });
        
        if (response.data.success) {
          console.log(response.data);
          setIsAuthenticated(true); // El token es válido
        } else {
          throw new Error("Token no válido o expirado");
          
        }
      } catch (error) {
        
        iziToast.error({
          title: "¡Error de Autenticación!",
          message: "Tu sesión ha expirado o no tienes permisos.",
          onClosing: () => navigate('/login'),
        });
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  if (loading) return <p>Cargando...</p>; // Puedes mostrar un indicador de carga

  return isAuthenticated ? children : null;
}