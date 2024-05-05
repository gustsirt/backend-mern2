
import { Link } from "react-router-dom"
import "./product.scss"

const ProductDetail = ({product, cart, addProduct}) => {
  return (
    <div className="product-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/products/">Productos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Página actual</li>
        </ol>
      </nav>
      <div className="product-display">
        <div className="img-section">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="detail-display">
          <div className="detail-section">
            <p className="category">{product.category}</p>
            <p className="title">{product.title}</p>
            <p className="code">Cod: {product.code}</p>
            <p className="price">$ {product.price.toLocaleString("es-ES", { style: "decimal" })}</p>
          </div>
          <div className="add-section">
            <p>Stock: {product.stock}</p>
            { (cart && product.stock > 0) && (<button onClick={addProduct}>Agregar Producto al Carrito</button>)}
          </div>
        </div>
      </div>
      <div className="description-section">
          <p className="description">{product.description}</p>
      </div>
    </div>
  )
}

export default ProductDetail