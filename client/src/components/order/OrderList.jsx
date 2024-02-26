import React from 'react'
import OrderListCard from './OrderListCard'
import OrderListPurchase from './OrderListPurchase'

const OrderList = ({products, isventa}) => {
  if (!isventa) {
    return (
      <div className="list-cards">
        {products.map(product => <OrderListCard  key={product._id} product={product}/>)}
      </div>
  )} else {
    return(
      <div className="list-cards">
        {products.map(product => <OrderListPurchase  key={product.id} product={product}/>)}
      </div>
  )}
}

export default OrderList