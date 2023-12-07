import React, { useState } from "react";
import "./Checkout.css";
import Header from "./Header";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProductes from "./CheckoutProduct";
import Navbar from './Navbar';

function Checkout() {
  const [{basket, user, order}, dispatch] = useStateValue();
  

  
  return (
    <div>
      <Navbar />
      <div className="checkout-e">
        <div className="left">
          <div>
          <h3>Hello, {user?.email}</h3>
            <h2 className="title">Your Shopping basket</h2>
            
            {basket.map(item => (
              <CheckoutProductes
              key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                
              />
          
            ))} 
            
            
          </div>
        </div>
        <div className="right-subtotal">
        <Subtotal/>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
