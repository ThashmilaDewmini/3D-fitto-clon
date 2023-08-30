import React from "react";
import "./Test.css";
import { SearchOutlined, ShoppingBasketOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function TestPage() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
    <div className="left_side">
    <div className="menu">
        <span className="item">Sunglass</span>
        <span className="item">Watch</span>
        <span className="item">Cap</span>
        <span className="item">Necklace</span>
        <span className="item">Earing</span>
      </div>
      <div className="search">
        <input className="search_in" type="text" />
        <SearchOutlined className="searchIcon" />
      </div>
    </div>
      
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          FitTo
        </Link>
      </div>
      <div className="right_side">
      
      <div className="header_nav">
        <div className="option" onClick={handleAuthentication}>
          <span className="option_one">
            Hello {!user ? "Guest" : user.email}
          </span>
          <span className="option_two">
            <Link
              to={!user && "/login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              {user ? "Sign Out" : "Sign In"}
            </Link>
          </span>
        </div>
        <div className="option">
          <span className="option_one">Return &</span>
          <span className="option_two">Order</span>
        </div>
        <div className="option">
          <span className="option_two">Prime</span>
        </div>
        <div className="optionBasket">
          <Link
            to="/checkout"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ShoppingBasketOutlined />
          </Link>
          <span className="basket_count">{basket?.length}</span>
        </div>
      </div>
      </div>
      
    </div>
  );
}
export default TestPage;
