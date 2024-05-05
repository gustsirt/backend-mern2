import { useState, useContext } from 'react';
import { ContextConfig } from '../context/ContextConfig';
import { ContextUser } from '../context/ContextUser';

const useCartService = () => {
  const { uriBase } = useContext(ContextConfig);
  const { token } = useContext(ContextUser)

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  token && headers.append("Authorization", token);

  const [loading, setLoading] = useState(false);

  const addOneProduct = async (cid, pid) => {
    try {
      setLoading(true);
      const response = await fetch(`${uriBase}/api/carts/${cid}/product/${pid}`, {
        method: 'POST',
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

  const removeOneProduct = async (cid, pid) => {
    try {
      setLoading(true);
      const response = await fetch(`${uriBase}/api/carts/${cid}/product/${pid}`, {
        method: 'PUT',
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

  const removeProduct = async (cid, pid) => {
    try {
      setLoading(true);
      const response = await fetch(`${uriBase}/api/carts/${cid}/product/${pid}`, {
        method: 'DELETE',
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

  const purchase = async (cid) => {
    try {
      setLoading(true);
      const response = await fetch(`${uriBase}/api/carts/${cid}/purchase`, {
        method: 'POST',
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

  return { loading, addOneProduct, removeOneProduct, removeProduct, purchase };
};

export default useCartService;
