import { Link } from "react-router-dom";

const ProductsEditListCard = ({product, onProductClick}) => {

  return (
    <div className="card">
      <button onClick={() => onProductClick(product)}>
        <img className="card-img" src={product.thumbnail} alt={product.title} />
        <p className="card-title">{product.title}</p>
        <div className="card-body">
            <p className="strong">$ {product.price.toLocaleString("es-ES", { style: "decimal" })}</p>
        </div>
        <div className="card-footer">
        </div>
      </button>
    </div>
  )
  
}

export default ProductsEditListCard