import { useContext, useEffect, useState } from "react";
import { ContextUser } from "../../context/ContextUser.jsx";
import OrderList from "../../components/order/OrderList.jsx";
import useFetchTokenService from "../../hook/useFetchTokenService.jsx";
import useSwalAlert from "../../hook/useSwalAlert.jsx";

const Order = () => {
  const { user } = useContext(ContextUser);
  const { fetchTData, postTData } = useFetchTokenService()
  const { message } = useSwalAlert()
  const [cartProducts, setCartProducts] = useState([]);
  const [venta, setVenta] = useState(false)
  const [detail, setDetail] = useState(null);
  const [products, setProducts] = useState(null);

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

  const purchase = async () => {
    if (user.cart){
      try { 
        const resp = await postTData(`api/carts/${user.cart}/purchase`)
        if (resp?.isError === false) {
          setVenta(true)
          setDetail(resp.payload.detail)
          setProducts(resp.payload.productList)
        } else {
          message(resp.message || "Error","error")
        }
      } catch (error) {
        message("Error al realizar la compra por el sistema","error");
      }
    }
  }

  useEffect(() => { getCartProduct() }, [user])

const sendEmail = async () => {
  try {
    const resp = await postTData(`api/mail/send`,{detail, products})
    if (resp.isError == false) {
      message("Correo electrónico enviado correctamente","success")
    } else {
      message("Error al enviar el correo electrónico: "+resp.message,"error");
    }
  } catch (error) {
    message("Error inesperado: "+error,"error")
  }
}

  if (!venta) {
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
  )
  } else {
    return (
      <div className="page-container">
      <h1 className="title">{`Orden de Compra: ${detail.code}`}</h1>
      <button onClick={sendEmail}>Enviar Comprobante</button>
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
  )}
}

export default Order