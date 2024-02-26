import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";
import ServiceCarts from "../services/cart.service.jsx";
import CartList from "../components/cart/CartList.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const {uriBase} = useContext(ContextConfig)
  const { user, token } = useContext(ContextUser);
  const [cartProducts, setCartProducts] = useState([]);
  const cartService = new ServiceCarts(uriBase, token);

  const getCartProduct = async () => {
    if (user.cart) {
      try {
        //console.log(token);
        //console.log(user);
        const resp = await cartService.getById(user.cart)
        //console.log(resp);
  
        if (resp?.isError === false) {
          setCartProducts(resp.payload.products);
        } else {
          Swal.fire({ icon: "error", text: '1'+resp.message || "Error al obtener productos" })
        }
      } catch (error) {
        Swal.fire({ icon: "error", text: "Error al obtener productos debido a un problema en el sistema" });
      }
    }
  }

  const addOneUnit = async (product) => {
    const resp = await cartService.addOneProduct(user.cart, product.product._id)
    if (resp?.isError === true) {
      Swal.fire({ icon: "error", text: resp.message || "Error al modificar el producto" });
    }
    getCartProduct()
  }

  const removeOneUnit = async (product) => {
    const resp = await cartService.removeOneProduct(user.cart, product.product._id)
    if (resp?.isError === true) {
      Swal.fire({ icon: "error", text: resp.message || "Error al modificar el producto" });
    }
    getCartProduct()
  }

  const removeItem = async (product) => {
    const resp = await cartService.removeProduct(user.cart, product.product._id)
    if (resp?.isError === true) {
      Swal.fire({ icon: "error", text: resp.message || "Error al modificar el producto" });
    }
    getCartProduct()
  }

  useEffect(() => {
    getCartProduct()
  }, [user])

  return (
    <div className="page-container">
      <h1 className="title">Carrito de: {user.name}</h1>
      <CartList products={cartProducts} oneMoreClick={addOneUnit} oneLessClick={removeOneUnit} onXClick={removeItem}/>
      <Link className="button-center" to={'/Order'}> Realizar la Compra</Link>
    </div>
  )
}

export default Cart