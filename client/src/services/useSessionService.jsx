import { useContext } from "react";
import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";

function useSessionService() {
  const { uriBase } = useContext(ContextConfig);
  const { setToken, } = useContext(ContextUser)

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const sessionLogIn = async (element) => {
    try {
      const response = await fetch(`${uriBase}api/sessions/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(element),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      const token = responseJson.payload.token;
      setToken(`Bearer ${token}`)
      
      return responseJson;
    } catch (error) {
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const sessionRegister = async (element) => {
    try {
      const response = await fetch(`${uriBase}api/sessions/register`, {
        method: "POST",
        headers,
        body: JSON.stringify(element),
      });
      return await response.json()
    } catch (error) {
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const sessionUser = async (token) => {
    try {
      headers.append("Authorization", token);
      const response = await fetch(`${uriBase}api/sessions/user`, {
        method: "GET",
        headers,
      })
      if(response.status >= 400) throw Error;
      return await response.json();
    } catch (error) {
      return { isError: true, message: "Ocurrió un error", error };
    }
  }

  const userRecovery = async (element) => {
    try {
      const response = await fetch(`${uriBase}api/sessions/userrecovery`, {
        method: "POST",
        headers,
        body: JSON.stringify(element),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return { isError: true, message: "Ocurrió un error", error };
    }
  }
  const userRecoveryPassword = async (element, token) => {
    try {
      headers.append("Authorization", `Bearer ${token}`);
      const response = await fetch(`${uriBase}api/sessions/userrecovery`, {
        method: "PUT",
        headers,
        body: JSON.stringify(element),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return { isError: true, message: "Ocurrió un error", error };
    }
  }

  return { sessionLogIn, sessionRegister, sessionUser, userRecovery, userRecoveryPassword };
}

export default useSessionService;
