import Layout from "./Layout";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Envio de email Exitoso!",
          text: "Se ha enviado a tu email un link para recuperar tu contraseña.",
          confirmButtonText: "Iniciar sesión",
          allowOutsideClick: false,

        }).then(() => {
          if(result.isConfirmed){
            navigate('/login');
          }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
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
                  Recuperar Contraseña
                </h1>
                <p className="mt-4 text-gray-700">
                  Ingresa tu correo electrónico y te enviaremos un enlace para
                  restablecer tu contraseña.
                </p>

                <form className="grid grid-cols-1 gap-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder="tucorreo@ejemplo.com"
                      className="block w-full px-4 py-3 mt-2 text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                      
                      aria-label="Email"
                    />
                    {errors["email"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["email"].message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
                  >
                    <span className="uppercase font-semibold">
                      Enviar Enlace
                    </span>
                  </button>

                  <p className="mt-4 text-sm text-center text-gray-600">
                    ¿Recordaste tu contraseña?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Iniciar Sesión
                    </a>
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
