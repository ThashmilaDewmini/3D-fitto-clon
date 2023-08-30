import "./App.css";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from './Payment';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51NggQVBPrxXu4acyksKwXO8cBsu4W3xSByfbCNZTuxlDuMYhnh9JjolIKSGgEvlthdU1fiLqkY02UwmA8crrqrZX00MocLtcr6");

function App() {
  const [{}, dispatch] = useStateValue();

  
  useEffect(()=>{
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if(authUser){
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else{
        // the user is loggedout
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/checkout" Component={Checkout}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path="login" element={<Login/>}></Route> 
          

          {/**<Route path="/payment" Component={Payment}></Route> */}
          <Route path="/payment" element={
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

