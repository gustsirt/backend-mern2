import { useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { BiLogIn, BiLogOut, BiCart, BiSolidUser, BiCreditCard,BiSolidUserPlus, BiSolidEdit } from "react-icons/bi";
import Swal from 'sweetalert2';


import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";
import SessionService from "../services/session.service.jsx";

const LayoutNav = () => {
  const { uriBase } = useContext(ContextConfig);
  const { user, setUser, token, setToken } = useContext(ContextUser);
  const sessionService = new SessionService(uriBase, token)

  const getUser = async () => {
    try {
      const resp = await sessionService.userSession()
      if (resp?.isError === false) {
        setUser(resp.payload);
      } else {
        throw new Error()
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      Swal.fire({ icon: "error", text: "Error de usuario" }).then((res) => { navigate("/login/", {replace: true}) });
    }
  }

  useEffect( () => {
    if (token) {
      getUser()
    } else {
      setUser(null);
    }
  }, [token])

  return (
    <nav className="nav">
    <ul>
      { !user && (
        <li><NavLink to="/">Inicio</NavLink></li>
      )}
      <li><NavLink to="products/">Productos</NavLink></li>
      { user && ( <>
        <li><NavLink to="addproducts/"><BiSolidEdit/>*</NavLink></li>
        <li><NavLink to="chat/">*Chat</NavLink></li>
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
            <NavLink to="user/">{user.name} <BiSolidUser /></NavLink>
            <NavLink to="logout/"><BiLogOut/></NavLink>
          </div>
          <p>Rol: {user.role}</p>
          </div>)}
    </div>
  </nav>
  )
}

export default LayoutNav