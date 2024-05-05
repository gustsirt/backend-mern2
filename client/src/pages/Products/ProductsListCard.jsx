import { Link } from "react-router-dom";

const ProductsListCard = ({product}) => {

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="card-img" src={product.thumbnail} alt={product.title} />
        <p className="card-title">{product.title}</p>
        <div className="card-body">
            <p className="strong">$ {product.price.toLocaleString("es-ES", { style: "decimal" })}</p>
            <p className="card-stock">Stock: {product.stock}</p>
        </div>
        <div className="card-footer">
        </div>
      </Link>
    </div>
  )
  
}

export default ProductsListCard