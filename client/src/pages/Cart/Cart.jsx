import { useContext, useEffect, useState } from "react";
import { ContextUser } from "../../context/ContextUser.jsx";
import CartList from "../../components/cart/CartList.jsx";
import { Link } from "react-router-dom";
import useSwalAlert from "../../hook/useSwalAlert.jsx";
import useFetchTokenService from "../../hook/useFetchTokenService.jsx";

const Cart = () => {
  const { user } = useContext(ContextUser);
  const [cartProducts, setCartProducts] = useState([]);
  const { message } = useSwalAlert()
  const { fetchTData, postTData, putTData, deleteTData } = useFetchTokenService()

  const getCartProduct = async () => {
    if (user.cart) {
      try {
        const resp = await fetchTData(`api/carts/${user.cart}`)
        if (resp?.isError === false) {
          setCartProducts(resp.payload.products);
        } else {
          message(resp.message || "Error al obtener productos","error")
        }
      } catch (error) {
        message("Error al obtener productos debido a un problema en el sistema","error");
      }
    }
  }

  const addOneUnit = async (product) => {
    const resp = await postTData(`api/carts/${user.cart}/product/${product.product._id}`);
    if (resp?.isError === true) {
      message(resp.message || "Error al modificar el producto","error")
    }
    getCartProduct()
  }

  const removeOneUnit = async (product) => {
    const resp = await putTData(`api/carts/${user.cart}/product/${product.product._id}`);
    if (resp?.isError === true) {
      message(resp.message || "Error al modificar el producto","error")
    }
    getCartProduct()
  }

  const removeItem = async (product) => {
    const resp = await deleteTData(`api/carts/${user.cart}/product/${product.product._id}`);
    if (resp?.isError === true) {
      message(resp.message || "Error al modificar el producto","error")
    }
    getCartProduct()
  }

  useEffect(() => {
    getCartProduct()
  }, [user])

  return (
    <div className="page-container">
      <h1 className="title">Carrito de: {user.name}</h1>
      { cartProducts.length === 0
        ? (<div>Carrito vacio...</div>)
        : (<>
          <CartList products={cartProducts} oneMoreClick={addOneUnit} oneLessClick={removeOneUnit} onXClick={removeItem}/>
          <Link className="button-center" to={'/Order'}> Realizar la Compra</Link>
        </>)
      }
    </div>
  )
}

export default Cart