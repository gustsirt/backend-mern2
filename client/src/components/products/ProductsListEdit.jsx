import ProductsEditListCard from "./ProductsListEditCard"

const ProductsListEdit = ({ products, onProductClick }) => {
  return (
    <div  className="list-cards">
        {products.map(product => <ProductsEditListCard  key={product._id} product={product} onProductClick={onProductClick}/>)}
    </div>
  );
};

export default ProductsListEdit