import React from "react";
import "./Checkout.css";
import Header from "./Header";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProductes from "./CheckoutProduct";



function Checkout() {
  const [{basket, user}, dispatch] = useStateValue();
  return (
    <div>
      <Header />
      <div className="checkout">
        <div className="left">
          <div>
          <h3>Hello, {user?.email}</h3>
            <h2 className="title">Your Shopping basket</h2>
            
            
            {basket.map(item => (
              <CheckoutProductes
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
          
            ))}
            
            
          </div>
        </div>
        <div className="right">
        <Subtotal/>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
