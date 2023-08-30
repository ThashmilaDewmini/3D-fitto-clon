import React, { useEffect, useState } from "react";
import "./Payment.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //Stripe expects the total in a currencies subuits
        url: `/payments/create?total=${getBasketTotal(basket) * 300}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    //do all the fancy stripe stuff
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    }).then(({paymentIntent})=>{
      //paymentIntent = payment confirmation
      setSucceeded(true);
      setError(null);
      setProcessing(false);

      navigate('/orders')
    })
  };
  const handleChange = (event) => {
    //Listen for changes in the cardElement and display any errors as
    //the customer types their card details
    setDisable(event.empaty); //if the event is empaty the set the disable
    setError(event.error ? event.error.message : ""); //otherwise if there is a an error then show the error mg otherwise nothing
  };

  return (
    <div>
      <Header />
      <div className="payment">
        <div className="container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} items</Link>)
          </h1>
          {/*payment section-default address*/}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment_address">
              <p>{user?.email}</p>
              <p>No02</p>
              <p>Benthota</p>
              <p>Sri Lanka</p>
            </div>
          </div>

          {/*payment section - review items */}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Review items and Delivery</h3>
            </div>
            <div className="payment_items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>

          {/*payment section - payment method */}
          <div className="payment_section">
            <div className="payment_title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment_detail">
              {/*Stripe magic will go */}
              <form onClick={handleSubmit}>
                <CardElement onChange={handleChange} />

                <div className="payment_priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total:{value}</h3>} //here value from through basket
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={processing || disable || succeeded}>
                    <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
