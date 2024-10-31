import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import iziToast from "izitoast";
import { useEffect } from 'react';
import "izitoast/dist/css/iziToast.css";

export default function ProtectedRoute ({ children }) {
 const navigate = useNavigate();
 
 useEffect(() => {
  const token = Cookies.get('token');

  if (!token) {
    iziToast.error({
      title: "¡Error!",
      message: "No se encontró ningún token válido.",
      onClosing: () => navigate('/login')
    });
    return; // Salimos de la función useEffect para evitar ejecutar el resto del código
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      iziToast.error({
        title: "¡Token Expirado!",
        message: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
        onClosing: () => navigate('/login')
      });
      Cookies.remove('token');
    }
  } catch (error) {
    iziToast.error({
      title: "¡Hubo un problema al verificar el token!",
      message: error.message,
      onClosing: () => navigate('/login')
    });
    Cookies.remove('token');
  }
}, []);

  return children; // Si hay token, renderiza el componente hijo
};
