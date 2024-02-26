import { useContext, useEffect } from 'react';
import { ContextUser } from '../context/ContextUser.jsx';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Logout = () => {
  const { setToken } = useContext(ContextUser);
  const navigate = useNavigate();
  
  useEffect(() => {
    setToken(null);
    localStorage.removeItem('token');

    Swal.fire({icon: "success", text: 'Has cerrado sessión'}).then((res) => { navigate("/", {replace: true}) })
  }, [setToken]);

  return null;
}

export default Logout;
