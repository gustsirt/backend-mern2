import React, { useContext, useEffect, useState } from "react";
import { ContextConfig } from "./context/ContextConfig.jsx";
//import { ContextUser } from "./context/ContextUser.jsx";
import Swal from 'sweetalert2';

const Products = () => {
  const { uriBase } = useContext(ContextConfig);
  //const { token } = useContext(ContextUser);
  const [products, setProducts] = useState([]);

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

        // if (!resp.ok) {
        //   throw new Error(`Error en la solicitud: ${resp.status} ${resp.statusText}`);
        // }

        const respJson = await resp.json();
        console.log(respJson)

        if (respJson?.isError === false) {
          setProducts(respJson.payload.products);
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
      <div className="products-container">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            {/* Puedes agregar más detalles según la estructura de tus productos */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;