import { useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { BiLogIn, BiLogOut, BiCart, BiSolidUser, BiCreditCard,BiSolidUserPlus, BiSolidEdit } from "react-icons/bi";
import { ContextUser } from "../../context/ContextUser.jsx";
import useSwalAlert from "../../hook/useSwalAlert.jsx";
import useFetchTokenService from "../../hook/useFetchTokenService.jsx";

const LayoutNav = () => {
  const { user, setUser, token, setToken, updateUser } = useContext(ContextUser);
  const { messageAndRedirect } = useSwalAlert()
  
  const { fetchTData } = useFetchTokenService()

  useEffect( () => {
    const getUser = async () => {
      try {
        const resp = await fetchTData('api/sessions/user')
        if (resp?.isError === false) {
          setUser(resp.payload);
        } else {
          throw new Error()
        }
      } catch (error) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        messageAndRedirect("Error de usuario", "error","/login/");
      }
    }
    if (token) {
      getUser()
    } else {
      setUser(null);
    }
  }, [token, updateUser])

  return (
    <nav className="nav">
    <ul>
      { !user && (
        <li><NavLink to="/">Inicio</NavLink></li>
      )}
      <li><NavLink to="products/">Productos</NavLink></li>
      { ( user && user.role != "user" ) && ( <>
        <li><NavLink to="addproducts/"><BiSolidEdit/>*</NavLink></li>
        <li><NavLink to="refcolores/">Colores a Usar</NavLink></li>
      </>)}
    </ul>
    <div className="user-widget">
      <ul className="link-access">
        {user
          ? (<>
              <li><NavLink to="cart/">Carrito<BiCart/></NavLink></li>
              <li><NavLink to="order/"><BiCreditCard /></NavLink></li>
            </>)
          : (<>
              <li><NavLink to="login/">LogIn <BiLogIn /></NavLink></li>
              <li><NavLink to="register/">Registrarse<BiSolidUserPlus/></NavLink></li>
            </>)}
      </ul>
      { user && (
          <div className="user-area">
          <div>
            <NavLink to="user/">{user.first_name} <BiSolidUser /></NavLink>
            <NavLink to="logout/"><BiLogOut/></NavLink>
          </div>
          <p>Rol: {user.role}</p>
          </div>)}
    </div>
  </nav>
  )
}

export default LayoutNav