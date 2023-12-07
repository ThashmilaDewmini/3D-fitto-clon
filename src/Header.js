
import React from "react";
import "./Header.css";
import { SearchOutlined, ShoppingBasketOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {

  const [{basket, user },dispatch] = useStateValue();

  const handleAuthentication = () => {
    if(user){
      auth.signOut();
    }
  }

  return (
    <div className="header">
    <span className="logo"><Link to="/" style={{textDecoration: 'none', color: 'black'}}>FitTo</Link></span>
    <div className="menu">
      <span className="item">Cap</span>
      <span className="item">Hat</span>
      <span className="item">Sunglass</span>
      <span className="item">Necklace</span>
      <span className="item">Earings</span>
    </div>
    
      <div className="search">
        <input className="search_in" type="text" />
        <SearchOutlined className="searchIcon"/>
      </div>
      
      <div className="header_nav">
        <div className="option" onClick={handleAuthentication}>
        {/**<span className="option_one">Hello {!user? 'Guest':user.email}</span> */}
        
        <span className="option_two"><Link to={!user && '/login'} style={{textDecoration: 'none', color: 'black'}}>{user ? 'Sign Out': 'Sign In'}</Link></span>
        </div>
        <div className="option">
          <span className="option_two"><Link to="/register" style={{textDecoration: 'none', color:'black'}}>Register</Link></span>
        </div>
        <div className="option">
        
          <span className="option_two">Order</span>
        </div>
        
        <div className="optionBasket">
            <Link to="/checkout" style={{textDecoration: 'none', color: 'black'}}><ShoppingBasketOutlined/></Link>
            <span className="basket_count">{basket?.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Header;



