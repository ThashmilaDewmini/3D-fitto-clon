import "./App.css";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Register from "./Register";

import { allproducts } from "./Data";
import ItemPage from "./ItemPage";
import PaymentPage from './PaymentPage';
import { useState } from "react";
import ProductPage from './PaymentPage';
import Viweproduct from "./Viweproduct";
import CategoryPage from "./CategoryPage";


function App() {

  const [query, setQuery] =useState("");

  const handleInputChange = event => {
    setQuery(event.target.value)
  }
  const filteredItems = allproducts.filter(allproducts => allproducts.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() !== -1));

  function fileredData(allproducts, query) {
    let filteredProducts  = allproducts;

    if (query) {
      filteredProducts = filteredItems;
    }
    return filteredProducts.map(
      ({title,img,price}) => (
        <ProductPage
          key={Math.random()}
          img={img}
          title={title}
          price={price}
        />
      )
    )

  }
  const result = fileredData(allproducts, query);

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is loggedout
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="/checkout" Component={Checkout}></Route>
          <Route path="/register" Component={Register}></Route>
          
          <Route path="/product/:id" element={<ItemPage/>}/>        
          <Route path="/paymentPage" Component={PaymentPage}></Route>
          <Route path="/viewproduct" Component={Viweproduct}/>
          <Route path="/category/:categoryID" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
