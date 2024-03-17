import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const useSwalAlert = () => {
  const navigate = useNavigate();

  const message = ( message, icon ) => {
    Swal.fire({
      icon: icon,
      text: message,
    })
  }

  const messageAndRedirect = ( message, icon, redirect = null) => {
    Swal.fire({
      icon: icon,
      text: message,
      showConfirmButton: redirect ? true : false,
    }).then((result) => {
      if (result.isConfirmed && redirect) {
        navigate(redirect, { replace: true });
      }
    });
  }

  const messageAndReload = ( message, icon) => {
    Swal.fire({
      icon: icon,
      text: message,
      showConfirmButton: true,
    }).then(() => {
      window.location.reload();
    });
  }

  return {
    message,
    messageAndRedirect,
    messageAndReload
  }
}
export default useSwalAlert