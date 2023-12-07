import React from 'react'

function Card({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.productImageUrl} alt={product.productName} />
      <h3>{product.productName}</h3>
      <p>${product.productPrice}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default Card