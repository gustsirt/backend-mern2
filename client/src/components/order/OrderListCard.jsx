
const OrderListCard = ({product}) => {
  return (
    <div className="horizontal-card">
      <img className="card-img" src={product.product.thumbnail} alt={product.title} />
      <p className="card-title">{product.product.title}</p>
      <p className="strong">$ {product.product.price.toLocaleString("es-ES", { style: "decimal" })} x unid.</p>
      <p className="">Cant: {product.quantity}</p>
      <p className="strong">$ {(product.product.price*product.quantity).toLocaleString("es-ES", { style: "decimal" })}</p>
    </div>
  )
}

export default OrderListCard