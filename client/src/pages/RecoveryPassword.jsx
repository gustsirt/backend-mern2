import { useForm }        from "react-hook-form";
import './useraccess.scss';
import useSessionService from "../services/useSessionService.jsx";
import useSwalAlert from "../../hook/useSwalAlert.jsx";
import { useLocation } from "react-router";

const RecoveryPassword = () => {
  const location = useLocation()
  const query = location.search
  const params = new URLSearchParams(query)
  const token = params.get('token')
  console.log(token);

  const { userRecoveryPassword } = useSessionService()
  const { register, handleSubmit, getValues, formState: { errors, isDirty, isValid } } = useForm({});
  const { messageAndRedirect } = useSwalAlert()
  
  const onSubmit = async data => {
    try {
      const resp = await userRecoveryPassword(data, token)
      if(resp?.isError === false) {
        messageAndRedirect("Contraseña actualizada, vuelva a iniciar sesiòn", "success", "/login")
      } else {
        console.log(resp);
        messageAndRedirect("Se ha producido un error con datos los enviados. Recordar que el enlace tenia validez de una hora", "error", "/userrecovery")
      }
    } catch (error) {
      messageAndRedirect("Error en el el envio del mensake debido a un problema en el sistema", "error")
    }
  };

  return (
    <div  className="page-container">
      <h2 className="title">Indicar mail de recuperación</h2>
      <form className="form-container-vert" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password">Contraseña</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p className="error-message">Este campo es requerido</p>}

        <label htmlFor="confirm_password">Confirmar Contraseña</label>
        <input type="password" {...register("confirm_password", {
            validate: value => value === getValues().password || "Las contraseñas no coinciden", })}
        />
        {errors.confirm_password && <p className="error-message">{errors.confirm_password.message}</p>}

        <button type="submit" disabled={!isDirty || !isValid}>Restablecer Contraseña</button>
      </form>
    </div>
  )
}

export default RecoveryPassword