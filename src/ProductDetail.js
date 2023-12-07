import React, { useState } from 'react';
import './ProductDetail.css';
import Navbar from './Navbar';
import Newsletter from './Newletter';
import Footer from './Footer';
import {useStateValue} from "./StateProvider";
import { Link } from 'react-router-dom';


const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const [{basket}, dispatch] = useStateValue();
  console.log('this is a basket>>',basket);
  const addToBasket = () =>{
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.id,
        title: product.productName,
        image: product.productImageUrl,
        price: product.productPrice, 
        
      },
    });
  };

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: product.id,
    })
  }


  return ( 
    <div>
    <Navbar/>
    <div className="product-detail">
    <div className='img-container'>
    <img className='img' src={product?.productImageUrl} alt={product?.productName} />
    </div>
     <div className='info'>
     <h2 className='title'>{product?.productName}</h2>
     <p className='description'>{product?.productDescription}</p>
      <p className='prodcut-price'>Price: ${product?.productPrice}</p>
      <div className="quantity-controls">
        <button className='sub' onClick={handleDecrease && removeFromBasket}>-</button>
        <span className='quntity'>{quantity}</span>
        <button className='add' onClick={handleIncrease && addToBasket}>+</button>
      </div>
      <div className='button-container'>
      <button onClick={addToBasket}>ADD TO CART</button>
      <Link to={product.moduleLink} style={{textDecoration:'none',color:'black'}}><button>TRY NOW</button></Link>
      <Link to="/paymentPage"><button onClick={addToBasket}>BUY NOW</button></Link>
      </div>
      
     </div> 
      
    </div>
    <Newsletter/>
    <Footer/>
    </div>
    
  );
};

export default ProductDetail;
