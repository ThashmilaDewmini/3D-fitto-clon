import { ArrowBack } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PaymentPage.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import PaymentProduct from "./PaymentProduct";
import Navbar from "./Navbar";
import Newletter from "./Newletter";
import Footer from "./Footer";

import { db } from "./firebase";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

function Payment() {
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  

  const [{ basket }, dispatch] = useStateValue();

  const checkUserRegistration = async () => {
    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('email', '==', email));
      getDocs(q)
      .then((querySnapshot) => {
        if(!querySnapshot.empty){
          querySnapshot.forEach((doc)=>{
            const userData = doc.data();
            console.log('user data:', userData);
            window.alert("Order is confirmed.");
          })
        }else{
          window.alert("Before Ordering you need to register");
        }
      })
      
    } catch (error) {
      console.error(error.message);
    }
  };
  const addToOrder = async() =>{
    try{
      if(email && fname && lName && address && city && country && phone){
        const total=getBasketTotal(basket);
        

        const orderData = {
          
          email,
          firstName: fname,
          lastName: lName,
          address,
          city,
          country,
          phone,
          total,
          timestamp: serverTimestamp(),
        }
        const ordersRef = collection(db, 'orders');
        const docRef = await addDoc(ordersRef, orderData);
        const orderID = docRef.id;

        const orderItems = [];
        for(const product of basket){
          const existingProduct = orderItems.find((item) => item.productID === product.id);

        if (existingProduct) {
          // If the product is already in the orderItems array, update the quantity and subtotal
          existingProduct.quantity++;
          existingProduct.subtotal += product.price;
        } else {
          // If the product is not in the orderItems array, add it
          orderItems.push({
            orderID,
            productID: product.id,
            productName: product.title,
            productPrice: product.price,
            productImage: product.image,
            quantity: 1,
            subtotal: product.price,
            // Add any other relevant product details here
          });
        }
      }
      const orderItemRef = collection(db, "orderItem");
      for (const orderItem of orderItems) {
        await addDoc(orderItemRef, orderItem);
      }
        window.alert(`Order has been placed successfully. Order ID: ${orderID}`);
        setEmail("");
        setAddress("");
        setCity("");
        setCountry("");
        setFName("");
        setLName("");
        setPhone("");
      }else{
        window.alert('Please fill in all required fields.');
      }
    }catch(error){
      console.error('Error adding order to Firestore:', error);
    }
  }
  return (
    <div>
      <Navbar />
      <h1 className="payment-page">Checkout</h1>
      <div className="checkout-payment">
        <div className="left-side">
          <div className="section-one">
            <h3 className="title-one">Contact Information</h3>
            <p className="accout-sign-in">
              Already have an aaccount?{" "}
              <Link to="/login" style={{ color: "black" }}>
                Sign In
              </Link>{" "}
            </p>
            <br></br>
          </div>
          <div className="section-two">
            <form>
              <input className="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}></input>
              <br></br>
              <h3>Shipping address</h3>
              <input className="text-box" placeholder="First name" onChange={(e) => setFName(e.target.value)}></input>
              <input className="text-box" placeholder="Last name" onChange={(e) => setLName(e.target.value)}></input>
              <br></br>
              <input className="text-box" placeholder="Address" onChange={(e) => setAddress(e.target.value)}></input>
              <br></br>
              <input className="text-box" placeholder="City" onChange={(e) => setCity(e.target.value)}></input>
              <input className="text-box" placeholder="Country" onChange={(e) => setCountry(e.target.value)}></input>
              <br></br>
              <input className="text-box" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}></input>
            </form>
          </div>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Totale Amount: <strong>{value}</strong>
                </p>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
          <div className="section-three">
            <div className="return">
              <Link
                to="/checkout"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ArrowBack />
              </Link>
              Return to cart
            </div>
            <div>
              <button onClick={checkUserRegistration && addToOrder}>Order Confirm</button>
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
      <Newletter />
      <Footer />
    </div>
  );
}

export default Payment;
