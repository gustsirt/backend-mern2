import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";
import ServiceCarts from "../services/cart.service.jsx";
import OrderList from "../components/order/OrderList.jsx";
import MailService from "../services/mail.service.jsx";

const Order = () => {
  const {uriBase} = useContext(ContextConfig)
  const { user, token } = useContext(ContextUser);
  const [cartProducts, setCartProducts] = useState([]);
  const cartService = new ServiceCarts(uriBase, token);
  const mailService = new MailService(uriBase, token);
  const [venta, setVenta] = useState(false)
  const [detail, setDetail] = useState(null);
  /* EJEMPLO detail {
    "code": "INVOICE1709169063213",
    "firstName": "Gustavo",
    "purchaser": "gustavo.sirtori@gmail.com",
    "quantity": 1,
    "amount": 2524099,
    "_id": "65dfd9a73d07ff2af618d87e",
    "purchase_datetime": "2024-02-29T01:11:03.361Z",
    "__v": 0
} */
  const [products, setProducts] = useState(null);
  /* EJEMPLO products [
    {
        "id": "657f74321a08d129f8cb9cb1",
        "title": "Bicicleta Cube Ruta Nuroad Pro 28 2022",
        "unitprice": 2524099,
        "code": "CUB22RGNUPR850G",
        "thumbnail": "https://newsport.vtexassets.com/arquivos/ids/17990457-800-auto?v=638381499849530000&width=800&height=auto&aspect=true",
        "quantity": 1,
        "amount": 2524099
    }
]*/
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
    //console.log("venta: ",venta);
    //console.log(detail);
    //console.log(products);
  },[venta, user])
  // const aaa = new Date().toLocaleDateString()

const sendEmail = async () => {
  try {
    const response = await mailService.sendEmail({detail, products})

    //console.log(response);
    //console.log(await response.json());
    if (response.ok) {
      // Mostrar mensaje de éxito
      Swal.fire({ icon: "success", text: "Correo electrónico enviado correctamente"})
    } else {
      // Mostrar mensaje de error
      Swal.fire({ icon: "error", text: "Error al enviar el correo electrónico: "+response.message})
      //console.log("Error al enviar el correo electrónico:", response.message);
    }
  } catch (error) {
    //console.error("Error inesperado:", error);
    Swal.fire({ icon: "error", text: "Error inesperado: "+error})
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