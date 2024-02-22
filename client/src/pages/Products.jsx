import { useContext, useEffect, useState } from "react";
import { ContextConfig } from "../context/ContextConfig.jsx";
//import { ContextUser } from "./context/ContextUser.jsx";
import Swal from 'sweetalert2';
import ProductsList from "../components/products/ProductsList.jsx";

const Products = () => {
  const { uriBase } = useContext(ContextConfig);
  //const { token } = useContext(ContextUser);
  const [products, setProducts] = useState([]);
  // TODO FALTA agregar paginacion
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const requestOptions = {
          // method: "GET",
          // headers: {
          //   "Content-Type": "application/json",
          //   Authorization: token,
          // },
        // };
        //const resp = await fetch(`${uriBase}api/products/`, requestOptions);
        const resp = await fetch(`${uriBase}api/products/`);

        if (!resp.ok) {
          throw new Error(`Error en la solicitud: ${resp.status} ${resp.statusText}`);
        }

        const respJson = await resp.json();
        //console.log(respJson.payload)

        if (respJson?.isError === false) {
          setProducts(respJson.payload.docs);
        } else {
          Swal.fire({ icon: "error", text: respJson.message || "Error al obtener productos" });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({ icon: "error", text: "Error al obtener productos debido a un problema en el sistema" });
      }
    };

    fetchProducts();
  }, [uriBase]);
  //  }, [uriBase, token]);

  return (
    <div className="page-container">
      <h1 className="title">Productos</h1>
      <ProductsList  products={products}/>
    </div>
  );
};

export default Products;