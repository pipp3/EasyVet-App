import Layout from "./Layout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      // Mostrar SweetAlert en estado de carga
      Swal.fire({
        title: "Registrándote...",
        text: "Por favor, espera.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verificar si el registro fue exitoso
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registro Exitoso!",
          text: "Tu cuenta ha sido creada con éxito. Se ha enviado un correo de confirmación a tu email, porfavor confirma tu cuenta antes de iniciar sesion.",
          confirmButtonText: "Iniciar sesión",
          allowOutsideClick: false,

        }).then(() => {
          if(result.isConfirmed){
            navigate('/login');
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error en el registro, intente nuevamente.",
        });
      }
    } catch (error) {
      // Manejar el error con un popup de SweetAlert
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error en la conexión, intente nuevamente.",
        });
      }
    }
  };
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
                  Complete los siguientes datos para crear su cuenta y comenzar
                  a configurar a gestionar citas para su mascota.
                </p>

                <form
                  className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="nombres"
                    >
                      Nombre(s)
                    </label>
                    <input
                      type="text"
                      id="nombres"
                      {...register("nombres", {
                        required: "Este campo es obligatorio.",
                        maxLength: {
                          value: 30,
                          message:
                            "El nombre no puede tener más de 30 caracteres.",
                        },
                      })}
                      placeholder="John"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      aria-label="Nombre(s)"
                    />
                    {errors["nombres"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["nombres"].message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="apellidos"
                    >
                      Apellido(s)
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      {...register("apellidos", {
                        required: "Este campo es obligatorio.",
                        maxLength: {
                          value: 30,
                          message:
                            "El apellido no puede tener más de 30 caracteres.",
                        },
                      })}
                      placeholder="Snow"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      aria-label="Apellido(s)"
                    />
                    {errors["apellidos"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["apellidos"].message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="celular"
                    >
                      Celular
                    </label>
                    <input
                      type="tel"
                      id="celular"
                      placeholder="9 XXXX XXXX"
                      {...register("celular", {
                        required: "El número de celular es obligatorio.",
                        pattern: {
                          value: /^9\d{8}$/,
                          message:
                            "El celular debe comenzar con 9 y tener 9 dígitos.",
                        },
                      })}
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      aria-label="Celular"
                    />
                    {errors["celular"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["celular"].message}
                      </p>
                    )}
                  </div>

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
                      placeholder="johnsnow@example.com"
                      {...register("email", {
                        required: "El correo electrónico es obligatorio.",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message:
                            "Debe ingresar un correo electrónico válido.",
                        },
                        maxLength: {
                          value: 80,
                          message:
                            "El correo no puede tener más de 80 caracteres.",
                        },
                      })}
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      aria-label="Email"
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
                      placeholder="Enter your password"
                      {...register("password", {
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

                  <div>
                    <label
                      className="block mb-2 text-sm text-gray-600"
                      htmlFor="confirm-password"
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirm-password"
                      placeholder="Confirm your password"
                      {...register("confirm-password", {
                        required: "Confirme su contraseña.",
                        validate: (value) =>
                          value === password || "Las contraseñas no coinciden",
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
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      aria-label="Confirmar contraseña"
                    />
                    {errors["confirm-password"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["confirm-password"].message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1 md:col-span-2 mt-4">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
                    >
                      <span className="uppercase font-semibold">
                        Registrarse
                      </span>
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
