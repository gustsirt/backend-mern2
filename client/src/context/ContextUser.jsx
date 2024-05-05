import { createContext, useEffect, useState } from 'react'

export const ContextUser = createContext()

const tokenPrevio = JSON.parse(localStorage.getItem("token"))

const UserProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [updateUser, setUpdateUser] = useState(0)
  const [token, setToken] = useState(tokenPrevio)

  useEffect (() => {localStorage.setItem("token", JSON.stringify(token))}, [token])

  return (
    <ContextUser.Provider value={{user, setUser, token, setToken, updateUser, setUpdateUser}}>
      {children}
    </ContextUser.Provider>
  )
}

export default UserProvider