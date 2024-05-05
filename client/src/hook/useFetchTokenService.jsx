import { useState, useContext } from 'react';
import { ContextConfig } from '../context/ContextConfig';
import { ContextUser } from '../context/ContextUser';

const useFetchTokenService = () => {
  const { uriBase } = useContext(ContextConfig);
  const { token } = useContext(ContextUser)

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  token && headers.append("Authorization", token);

  const [loading, setLoading] = useState(false);

  const fetchTData = async (endpoint, filters = "") => {
    try {
      setLoading(true);
      if (filters != "") {
        const queryString = new URLSearchParams(filters).toString();
        filters = "?"+queryString
      }
      const response = await fetch(`${uriBase}/${endpoint}${filters}`, {
        method: 'GET',
        headers
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const postTData = async (endpoint, body) => {
    try {
      setLoading(true);
      const response = await fetch(`${uriBase}/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const putTData = async (endpoint, body) => {
    try {
      setLoading(true);
      const response = await fetch(`${uriBase}/${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  const deleteTData = async (endpoint) => {
    try {
      setLoading(true);
      const response = await fetch(`${uriBase}/${endpoint}`, {
        method: 'DELETE',
        headers,
      });
      if(response.status >= 400) throw Error;
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      return { isError: true, message: "Ocurrió un error", error };
    }
  };

  return { loading, fetchTData, postTData, putTData, deleteTData };
};

export default useFetchTokenService;
