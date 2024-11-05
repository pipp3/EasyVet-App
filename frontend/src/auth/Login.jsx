import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import iziToast from "izitoast";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "izitoast/dist/css/iziToast.css";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      Swal.fire({
        title: "Iniciando sesión...",
        text: "Por favor, espera.",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
  
      setTimeout(async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/auth/login", data, {
            withCredentials: true, // Permite el envío de cookies al servidor
          });
  
          if (response.status === 200) {
            Swal.close(); // Cierra el popup de carga
            iziToast.success({
              title: "¡Éxito!",
              message: "Inicio de sesión exitoso.",
              position: "topRight",
            });
            navigate("/");
          }
        } catch (error) {
          Swal.close();
          if (error.response) {
            const { status, data } = error.response;
            if (status === 400) {
              Swal.fire({
                icon: "error",
                title: "Contraseña incorrecta",
                text: "La contraseña ingresada es incorrecta.",
              });
            } else if (status === 404) {
              Swal.fire({
                icon: "error",
                title: "Email no registrado",
                text: "El correo ingresado no está registrado.",
              });
            } else if (status === 500) {
              Swal.fire({
                icon: "error",
                title: "Error del Servidor",
                text: data.error || "Ocurrió un problema en el servidor. Inténtalo más tarde.",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "¡Error!",
                text: "Error desconocido. Inténtalo de nuevo.",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Error de red",
              text: "No se pudo conectar con el servidor. Verifica tu conexión e inténtalo nuevamente.",
            });
          }
        }
      }, 800);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error desconocido. Inténtalo de nuevo.",
      });
      console.error("Error en onSubmit:", error);
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
                  Inicia Sesión
                </h1>
                <p className="mt-4 text-gray-700">
                  Bienvenido de vuelta. Inicia sesión para acceder a tu cuenta.
                </p>

                <form
                  className="grid grid-cols-1 gap-6 mt-8"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "El email es obligatorio.",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Debe ingresar un email válido.",
                        },
                        maxLength: {
                          value: 80,
                          message:
                            "El email no puede tener más de 80 caracteres.",
                        },
                      })}
                      placeholder="tucorreo@ejemplo.com"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      aria-label="E
                      mail"
                    />
                    {errors["email"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["email"].message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "La contraseña es obligatoria.",
                      })}
                      placeholder="Ingresa tu contraseña"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      aria-label="Contraseña"
                    />
                    <span
                      className="text-sm cursor-pointer text-blue-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"} contraseña
                    </span>
                    {errors["password"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["password"].message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-600"
                      >
                        Recuérdame
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
                  >
                    <span className="uppercase font-semibold">
                      Iniciar Sesión
                    </span>
                  </button>

                  <p className="mt-4 text-sm text-center text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline"
                    >
                      Regístrate
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
