import { useContext } from "react";
import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const LogIn = () => {
  const { uriBase } = useContext( ContextConfig );
  const { setToken } = useContext( ContextUser );
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: 'email@prueba.com',
      password: '123456'
    },
  });

  const onSubmit = async data => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      };

      const respJson = await fetch(`${uriBase}api/sessions/login`, requestOptions)
      const resp = await respJson.json()

      if(resp?.isError === false) {
        setToken(`Bearer ${resp.payload.token}`)
        Swal.fire({icon: "success", text: resp.message}).then((res) => { navigate("/products/", {replace: true}) })
      } else {
        Swal.fire({icon: "error", text: "Acceso no autorizado"})
      }

    } catch (error) {
      console.error(error);
      Swal.fire({icon: "error", text: "Acceso no autorizado por un error en el sistema"})
    }
  };

  return (
    <div  className="page-container">
      <h1 className="title">Inicio de Sesión</h1>
      <form className="form-container-vert" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">   Email</label>
        <input type="email" {...register("email",    { required: true})} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" {...register("password", { required: true})} />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default LogIn