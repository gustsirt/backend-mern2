
const OrderListPurchase = ({product}) => {
  return (
    <div className="horizontal-card">
      <img className="card-img" src={product.thumbnail} alt={product.title} />
      <p className="card-title">{product.title}</p>
      <p className="strong">$ {product.unitprice.toLocaleString("es-ES", { style: "decimal" })} x unid.</p>
      <p className="">Cant: {product.quantity}</p>
      <p className="strong">$ {(product.amount).toLocaleString("es-ES", { style: "decimal" })}</p>
    </div>
  )
}

export default OrderListPurchase