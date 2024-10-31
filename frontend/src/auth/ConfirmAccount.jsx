import Layout from "./Layout";
import { useEffect } from "react";
import "izitoast/dist/css/iziToast.css";
import Swal from "sweetalert2";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
//import jwtDecode from "jwt-decode";
export default function ConfirmAccount() {

  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró ningún token de confirmación. Intentalo nuevamente.",
        confirmButtonText: "Ir al login",
        allowOutsideClick: false,
        allowEscapeKey: false,
        willClose: () => {
          navigate("/login");
        },
      });
      return;
    }
    const confirmAccount = async () => {
      Swal.fire({
        title: "Confirmando cuenta...",
        text: "Por favor, espera.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
    
        const response = await axios.post(
          `http://localhost:3000/api/auth/confirm-account/${token}`
        );

        setTimeout(() => {
          Swal.close();
          if (response.status === 200) {
            setIsConfirmed(true); // Actualiza el estado para renderizar el contenido
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.data.error || "No se pudo confirmar la cuenta.",
              confirmButtonText: "Ir al login",
              allowOutsideClick: false,
              allowEscapeKey: false,
              willClose: () => {
                navigate("/login");
              },
            });
          }
        }, 1000);

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al confirmar la cuenta. Inténtalo más tarde.",
          confirmButtonText: "Ir al login",
          allowOutsideClick: false,
          allowEscapeKey: false,
          willClose: () => {
            navigate("/login");
          },
        });
      }
    };

    confirmAccount();
  }, [token, navigate]);
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div>
            <h1 className="text-2xl font-semibold text-blue-600">
              ¡Cuenta Confirmada!
            </h1>
            <p className="mt-4 text-gray-700">
              Tu cuenta ha sido confirmada exitosamente!!. Puedes iniciar sesión
              y cerrar esta ventana. ahora.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
