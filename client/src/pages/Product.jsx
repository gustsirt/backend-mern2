import { useContext, useEffect, useState } from "react";
import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import ProductDetail from "../components/products/ProductDetail.jsx";
import ServiceCarts from "../services/cart.service.jsx";

const Product = () => {
  const { uriBase } = useContext(ContextConfig);
  const { user, token } = useContext(ContextUser);
  const [product, setProduct] = useState([]);
  const { pid } = useParams()
  const cartService = new ServiceCarts(uriBase, token);

  const fetchProducts = async () => {
    try {
      const resp = await fetch(`${uriBase}api/products/${pid}`);

      if (!resp.ok) {
        throw new Error(`Error en la solicitud: ${resp.status} ${resp.statusText}`);
      }

      const respJson = await resp.json();
      // console.log(respJson)
      
      if (respJson?.isError === false) {
        setProduct(respJson.payload);
      } else {
        Swal.fire({ icon: "error", text: respJson.message || "Error al obtener productos" });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", text: "Error al obtener productos debido a un problema en el sistema" });
    }
  };

  const addProduct = async () => {
    try {
      const resp = await cartService.addOneProduct(user.cart, product._id)
      if (resp?.isError === false) {
        const message = `El producto fue agregado correctamente` 
        Swal.fire({ icon: "success", text: message });
        fetchProducts()
      } else {
        Swal.fire({ icon: "error", text: resp.payload || resp.message || "Error al eliminar el producto" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: resp.payload || resp.message || "Error debido a un problema en el sistema" });
    }
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts();
  }, [uriBase, token]);

  return (
    <div className="page-container">
      { product.length === 0 ? <p>Cargando...</p> : <ProductDetail product={product} cart={user.cart} addProduct={addProduct}/> }
    </div>
  )
}

export default Product