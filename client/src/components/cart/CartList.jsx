import React from 'react'
import CartListCard from './CartListCard'

const CartList = ({products, oneMoreClick, oneLessClick, onXClick}) => {
  return (
    <div className="list-cards">
      {products.map(product => <CartListCard  key={product._id} product={product} oneMoreClick={oneMoreClick} oneLessClick={oneLessClick} onXClick={onXClick}/>)}
    </div>
  )
}

export default CartList