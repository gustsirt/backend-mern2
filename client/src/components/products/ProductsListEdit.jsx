import ProductsEditListCard from "./ProductsListEditCard"

const ProductsListEdit = ({ products, onProductClick, onXClick }) => {
  return (
    <div  className="list-cards">
        {products.map(product => <ProductsEditListCard  key={product._id} product={product} onProductClick={onProductClick} onXClick={onXClick}/>)}
    </div>
  );
};

export default ProductsListEdit