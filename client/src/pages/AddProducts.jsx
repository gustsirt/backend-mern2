import { useContext, useEffect, useState } from "react";
import { ContextConfig } from "../context/ContextConfig.jsx";
//import { ContextUser } from "./context/ContextUser.jsx";
import Swal from 'sweetalert2';
import ProductsList from "../components/products/ProductsList.jsx";
import ServiceProducts from "../services/products.jsx";

const AddProducts = () => {
  const { uriBase } = useContext(ContextConfig);
  //const { token } = useContext(ContextUser);
  const [products, setProducts] = useState([]);
  const serviceProducts = new ServiceProducts()

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
        const resp = await serviceProducts.get()
        console.log(resp);

        if (respJson?.isError === false) {
          setProducts(resp.payload.docs);
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
      <h1 className="title">Editar Productos</h1>
      <div className="flex-row">
        <div className="row-70">
          // TODO FALTA agregar paginacion
          <ProductsList products={products}/>
        </div>
        <div className="row-30">
        </div>
      </div>
    </div>
  );
};

export default AddProducts;