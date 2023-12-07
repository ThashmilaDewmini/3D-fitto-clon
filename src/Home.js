
import React, { useState } from "react";
import "./Home.css";


import NewNavbar from "./NewSlider";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Newsletter from "./Newletter";


import AllProducts from "./AllProducts";







function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (   
    <div className="home">
      <div className="home_container">
      <Navbar onSearch={handleSearch}/>
      <NewNavbar/>
        <AllProducts  searchTerm={searchTerm} 
            />
          <Newsletter/>
          <Footer/>
      </div>
     
    </div>
  );
}

export default Home;

