import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./PaymentPage.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import PaymentProduct from "./PaymentProduct";
import Navbar from "./Navbar";
import Newletter from './Newletter';
import Footer from './Footer';

import {db} from './firebase';

function Payment() {
  const [{ basket }, dispatch] = useStateValue();

  const checkUserRegistration = async (userId) => {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) {
        // User is registered in the database
        console.log('User is registered.');
        window.alert('Order is confirmed.');
      } else {
        // User is not registered in the database
        console.log('User is not registered.');
        // You can also display an alert or show a message to the user
        // Example using window.alert:
        window.alert('User is not registered.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
    <Navbar/>
      <h1 className="payment-page">Checkout</h1>
      <div className="checkout-payment">
        <div className="left-side">
          <div className="section-one">
            <h3 className="title-one">Contact Information</h3>
            <p className="accout-sign-in">
              Already have an aaccount?{" "}
              <Link to="/singin" style={{ color: "black" }}>
                Sign In
              </Link>{" "}
            </p>
            <br></br>
          </div>
          <div className="section-two">
            <form>
              <input className="email" placeholder="Email"></input>
              <br></br>
              <h3>Shipping address</h3>
              <input className="text-box" placeholder="First name"></input>
              <input className="text-box" placeholder="Last name"></input>
              <br></br>
              <input className="text-box" placeholder="Address"></input>
              <br></br>
              <input className="text-box" placeholder="City"></input>
              <input className="text-box" placeholder="Country"></input>
              <br></br>
              <input className="text-box" placeholder="Phone"></input>
            </form>
          </div>
          <div className="section-three">
            <div className="return">
              <Link to='/checkout' style={{textDecoration:'none',color:'black'}}><ArrowBack /></Link>
              Return to cart
            </div>
            <div>
              <button onClick={checkUserRegistration}>Order Confirm</button>
            </div>
          </div>
        </div>
        <div className="right-side">
          <h3>List Of Your Products</h3>
          <div className="payment_items">
            {basket.map((item) => (
              <PaymentProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <Newletter/>
      <Footer/>
    </div>
  );
}

export default Payment;
