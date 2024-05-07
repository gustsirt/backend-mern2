import { useContext, useEffect, useState } from "react";
import { ContextUser } from "../../context/ContextUser.jsx";
import { useParams } from "react-router-dom";
import useFetchService from "../../hook/useFetchService.jsx";
import ProductDetail from "./ProductDetail.jsx";
import useSwalAlert from "../../hook/useSwalAlert.jsx";
import useFetchTokenService from "../../hook/useFetchTokenService.jsx";

const Product = () => {
  const { fetchData } = useFetchService()
  const { postTData } = useFetchTokenService()
  const { message, messageAndRedirect } = useSwalAlert()
  const { user } = useContext(ContextUser);
  const [ product, setProduct ] = useState([]);
  const { pid } = useParams()

  const fetchProducts = async () => {
    try {
      const resp = await fetchData(`api/products/${pid}`);
      if (resp?.isError === false) {
        setProduct(resp.payload);
      } else {
        message(resp.message || "Error al obtener productos","error")
      }
    } catch (error) {
      message("Error al obtener productos debido a un problema en el sistema","error");
    }
  };

  const addProduct = async () => {
    try {
      const resp = await postTData(`api/carts/${user.cart}/product/${product._id}`);
      if (resp?.isError === false) {
        messageAndRedirect(`El producto fue agregado correctamente`,"success", "/products");
        fetchProducts()
      } else {
        message(resp.message || "Error al eliminar el producto" ,"error");
      }
    } catch (error) {
      message("Error al obtener productos debido a un problema en el sistema","error");
    }
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts();
  }, [pid]);

  return (
    <div className="page-container">
      { product.length === 0 ? <p>Cargando...</p> : <ProductDetail product={product} cart={user.cart} addProduct={addProduct}/> }
    </div>
  )
}

export default Product