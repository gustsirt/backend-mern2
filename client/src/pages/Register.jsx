import { useContext } from "react";
import { ContextConfig } from "./context/ContextConfig.jsx"; // Assuming existing context for configuration
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Register = () => {
  const { uriBase } = useContext(ContextConfig);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: 'emailx@prueba.com',
      password: '7123456'
    },
  });

  const onSubmit = async (data) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const respJson = await fetch(`${uriBase}api/users`, requestOptions);
      const resp = await respJson.json();

      if (resp?.isError === false) {
        // Handle successful registration (e.g., redirect to login or profile)
        Swal.fire({
          icon: "success",
          text: "Registro exitoso. Por favor inicie sesión",
        }).then((res) => {
          navigate("/login"); // Redirect to login after successful registration
        });
      } else {
        // Handle registration errors (e.g., display them to the user)
        Swal.fire({
          icon: "error",
          text: resp.message, // Use specific error message from response
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        text: "Error en el registro. Intentelo nuevamente",
      });
    }
  };

  return (
    <div className="page-container">
      <h1 className="title">Registro</h1>
      <form className="form-container-vert" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="email"
            {...register("email", { required: "El email es obligatorio",
            pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Ingrese un email válido" }})}
          invalid={errors.email?.message}           error={errors.email?.message}
        />
        <label htmlFor="password">Contraseña</label>
        <input type="password"
          {...register("password", { required: "La contraseña es obligatoria" })}
          invalid={errors.password?.message}        error={errors.password?.message}
        />
        <label htmlFor="confirmPassword">Confirme Contraseña</label>
        <input type="password" 
          {...register("confirmPassword", {required: "Confirme la contraseña",
          validate: (value) => value === data.password || "Las contraseñas no coinciden" })}
          invalid={errors.confirmPassword?.message} error={errors.confirmPassword?.message}
        />
        <button type="submit" disabled={!isValid}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
