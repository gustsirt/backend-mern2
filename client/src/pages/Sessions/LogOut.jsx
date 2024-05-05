import { useContext, useEffect } from 'react';
import { ContextUser } from '../../context/ContextUser.jsx';
import useSwalAlert from '../../hook/useSwalAlert.jsx';

const Logout = () => {
  const { setToken } = useContext(ContextUser);
  const { messageAndRedirect } = useSwalAlert()
  
  useEffect(() => {
    setToken(null);
    localStorage.removeItem('token');
    messageAndRedirect("Has cerrado sessión", "success", "/")
  }, []);

  return null;
}

export default Logout;
