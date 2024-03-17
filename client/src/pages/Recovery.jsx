import { useForm }        from "react-hook-form";
import './useraccess.scss';
import useSessionService from "../services/useSessionService";
import useSwalAlert from "../../hook/useSwalAlert";

const Recovery = () => {
  const { userRecovery } = useSessionService()
  const { register, handleSubmit } = useForm({});
  const { messageAndRedirect } = useSwalAlert()
  
  const onSubmit = async data => {
    try {
      const resp = await userRecovery(data)
      if(resp?.isError === false) {
        messageAndRedirect("Mail de recuperación enviado. Revisa tu casilla de correo", "success")
      } else {
        messageAndRedirect("Se ha producido un error con datos los enviados", "error")
      }
    } catch (error) {
      messageAndRedirect("Error en el el envio del mensake debido a un problema en el sistema", "error")
    }
  };

  return (
    <div  className="page-container">
      <h2 className="title">Indicar mail de recuperación</h2>
      <form className="form-container-vert" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">   Email</label>
        <input type="email" {...register("email",    { required: true})} />
        <button type="submit">Enviar mail</button>
      </form>
    </div>
  )
}

export default Recovery