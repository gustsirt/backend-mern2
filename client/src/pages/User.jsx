import React from 'react'
import { useContext } from 'react';
import { ContextUser } from '../context/ContextUser';
import useFetchService from '../hook/useFetchService';

const User = () => {
  const { user, updateUser, setUpdateUser } = useContext(ContextUser);
  const { fetchData} = useFetchService()
  
  const changeRol = async (role) => {
    if (role == "user") { role = user.role; }
    await fetchData(`api/users/access/${user._id}/${role}`)
    setUpdateUser(updateUser+1)
  }
  return (
    <div className="page-container">
      <h1 className="title">Usuario</h1>
      <div>
        <p>Usuario: {user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Ultima Actualización: {user.lastupdated}</p>
        <p>Ultima Conección: {user.lastconnection}</p>
      </div>
      <br></br>
      <div>
        <strong>Cambiar de rol:</strong>
        <button onClick={()=>{changeRol("admin")}}>Administrador</button>
        <button onClick={()=>{changeRol("user_premium")}}>Premium</button>
        <button onClick={()=>{changeRol("user")}}>User</button>
      </div>
    </div>
  )
}

export default User