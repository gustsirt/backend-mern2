import { BiSolidXSquare } from "react-icons/bi";

const ProductsEditListCard = ({product, onProductClick, onXClick}) => {

  return (
    <div className="card">
      <div className="relative">
        <button onClick={() => onProductClick(product)}>
          <img className="card-img" src={product.thumbnail} alt={product.title} />
          <p className="card-title">{product.title}</p>
          <div className="card-body">
              <p>Code: {product.code}</p>
              <p>Stock: {product.stock}</p>
              <p className="strong">$ {product.price.toLocaleString("es-ES", { style: "decimal" })}</p>
              <p>Dueño: {product.owner}</p>
          </div>
          <div className="card-footer">
          </div>
        </button>
        <button className="button-square-XRED" onClick={() => onXClick(product)}><BiSolidXSquare /></button>
      </div>
    </div>
  )
  
}

export default ProductsEditListCard