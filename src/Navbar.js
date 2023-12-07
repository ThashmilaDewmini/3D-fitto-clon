import React, { useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import {SearchOutlined, ShoppingBasket } from '@material-ui/icons';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { Menu } from '@material-ui/core';

function Navbar({ onSearch }) {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    if(event){
      const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
    }else{
      alert('Search products not available');
    }
      // Pass the search term to the parent component
  };

  const [{basket, user },dispatch] = useStateValue();

  const handleAuthentication = () => {
    if(user){
      auth.signOut();
    }
  }
  return (
    <nav className="navbar">
    
      <div className="navbar-logo">
        <Link to="/">FitTo</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/category/c001">Cap & Hat</Link></li>
        <li><Link to="/category/c002">Jewelry</Link></li>
        <li><Link to="/category/c004">Sunglass</Link></li>
        <li><Link to="/category/c003">Watch</Link></li>
        
      </ul>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." onChange={handleSearch}/>
        <button className='search-button' onChange={handleSearch}><SearchOutlined/></button>
      </div>
      <div className="navbar-auth">
        <div  onClick={handleAuthentication}>
        {/**<span className="option_one">Hello {!user? 'Guest':user.email}</span> */}
        
        <span><Link to={user ? '/' : '/login'} style={{textDecoration: 'none', color: 'black'}}>{user ? 'Sign Out': 'Sign In'}</Link></span>
        </div>
        <Link to="/register">Register</Link>
        <div>
        <Link to="/checkout"><ShoppingBasket/></Link>
        <span className="basket_count">{basket?.length}</span>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;