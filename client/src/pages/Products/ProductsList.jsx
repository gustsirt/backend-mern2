import ProductsListCard from "./ProductsListCard"

const ProductsList = ({products}) => {
  return (
    <div className="list-cards">
      {products.map(product => <ProductsListCard  key={product._id} product={product}/>)}
    </div>
  )
}

export default ProductsList