import Layout from "./Layout";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState,useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import "izitoast/dist/css/iziToast.css";

export default function ChangePassword() {
  const { register, handleSubmit,formState: { errors },
  watch, } = useForm();
  const newPassword = watch("newPassword", "");
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {token} = useParams();
  
  useEffect(() => {
    // Verificar el token al montar el componente
    const verifyToken = () => {
      try {
        if (!token) {
          throw new Error("No se encontró el token de restablecimiento");
        }

        // Decodificar y verificar la expiración del token
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          throw new Error("El enlace de restablecimiento ha expirado");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error de Validación",
          text: error.message || "Link inválido o expirado",
          confirmButtonText: "Ir al login"
        }).then(() => {
          navigate("/login");
        });
      }
    };

    verifyToken();
  }, [navigate, location]);
  const onSubmit = async (data) => {
    
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, data);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: response.data.message || "Contraseña cambiada exitosamente. Seras redirigido al login.",
        });
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error desconocido. Inténtalo de nuevo.";
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: errorMessage,
      });
    }
  };
  return (
    <div>
      <Layout>
        <section className="w-[1300px] rounded-md p-8">
          <div className="flex justify-center">
            <div className="flex items-center w-full max-w-lg p-8 mx-auto lg:px-12 lg:w-2/5 bg-white rounded-lg shadow-lg">
              <div className="w-full">
                <h1 className="text-3xl font-semibold tracking-wider font-serif text-blue-600 capitalize">
                  Cambiar Contraseña
                </h1>
                <p className="mt-4 text-gray-700">
                  Ingresa tu nueva contraseña para actualizar tu cuenta.
                </p>

                <form
                  className="grid grid-cols-1 gap-6 mt-8"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="newPassword"
                    >
                      Nueva Contraseña
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      {...register("newPassword", {
                        required: "La contraseña es obligatoria.",
                        minLength: {
                          value: 8,
                          message:
                            "La contraseña debe tener al menos 8 caracteres.",
                        },
                        pattern: {
                          value: passwordPattern,
                          message:
                            "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.",
                        },
                      })}
                      placeholder="Ingresa nueva contraseña"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      required
                      aria-label="Nueva Contraseña"
                    />
                    <span
                      className="text-sm cursor-pointer text-blue-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"} contraseña
                    </span>
                    {errors["newPassword"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newConfirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="newConfirmPassword"
                    >
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newConfirmPassword"
                      {...register("newConfirmPassword", {
                        required: "Confirme su contraseña.",
                        validate: (value) =>
                          value === newPassword || "Las contraseñas no coinciden",
                        minLength: {
                          value: 8,
                          message:
                            "La contraseña debe tener al menos 8 caracteres.",
                        },
                        pattern: {
                          value: passwordPattern,
                          message:
                            "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.",
                        },
                      })}
                      placeholder="Confirma la nueva contraseña"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                  
                      aria-label="Confirmar Nueva Contraseña"
                    />
                    {errors.newConfirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newConfirmPassword.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
                  >
                    <span className="uppercase font-semibold">
                      Actualizar Contraseña
                    </span>
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
