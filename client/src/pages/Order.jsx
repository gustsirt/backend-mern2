import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";
import ServiceCarts from "../services/cart.service.jsx";
import OrderList from "../components/order/OrderList.jsx";

const Order = () => {
  const {uriBase} = useContext(ContextConfig)
  const { user, token } = useContext(ContextUser);
  const [cartProducts, setCartProducts] = useState([]);
  const cartService = new ServiceCarts(uriBase, token);
  const [venta, setVenta] = useState(false)
  const [detail, setDetail] = useState(null);
  const [products, setProducts] = useState(null);

  const getCartProduct = async () => {
    if (user.cart) {
      try {
        const resp = await cartService.getById(user.cart)
  
        if (resp?.isError === false) {
          setCartProducts(resp.payload.products);
        } else {
          Swal.fire({ icon: "error", text: resp.message || "Error al obtener productos" })
        }
      } catch (error) {
        Swal.fire({ icon: "error", text: "Error al obtener productos debido a un problema en el sistema" });
      }
    }
  }

  const purchase = async () => {
    if (user.cart){
      try { 
        const resp = await cartService.purchase(user.cart)
        if (resp?.isError === false) {
          setVenta(true)
          setDetail(resp.payload.detail)
          setProducts(resp.payload.productList)
          // console.log("venta: ",venta);
        } else {
          Swal.fire({ icon: "error", text: resp.message || "Error"})
        }
      } catch (error) {
        Swal.fire({ icon: "error", text: "Error al realizar la compra por el sistema" });
      }
    }
  }

  useEffect(() => {
    getCartProduct()
  }, [user])

  useEffect(()=>{
    // console.log("venta: ",venta);
    // console.log(detail);
    // console.log(products);
  },[venta])
  // const aaa = new Date().toLocaleDateString()
  if (venta) {
  return (
    <div className="page-container">
      <h1 className="title">{`Orden de Compra: ${detail.code}`}</h1>
      <div>
        <p>Nombre: {detail.firstName}</p>
        <p>Email: {detail.purchaser}</p>
        <p>Fecha y hora: {detail.purchase_datetime}</p>
      </div>
      <OrderList products={products} isventa={venta}/>
      <div>
        <h2 className="strong">Cantidad de articulos: {products.reduce((acc, ele)=>acc+ele.quantity,0)}</h2>
        <h2 className="strong">Monto total: $ {products.reduce((acc, ele)=>acc+ele.amount,0).toLocaleString("es-ES", { style: "decimal" })}</h2>
      </div>
    </div>
  )
  } else {
  return (
    <div className="page-container">
      <h1 className="title">Finalizar Compra</h1>
      <OrderList products={cartProducts} isventa={venta}/>
      {user.cart && (<>
          <div>
          <p className="strong">Cantidad de articulos: {cartProducts.reduce((acc, ele)=>acc+ele.quantity,0)}</p>
          <p className="strong">Monto total: $ {cartProducts.reduce((acc, ele)=>acc+ele.quantity*ele.product.price,0).toLocaleString("es-ES", { style: "decimal" })}</p>
        </div>
        <button className="button-center" onClick={()=>purchase()}>Confirmar</button>
      </>)}
    </div>
  )}
}

export default Order