import React from "react";
import "./Home.css";
import img5 from "./image/img5.jpeg";
import Product from "./Product";
import image from "./image/shose.jpg";
import sunglass1 from './image/sunglass.jpg';
import sunglass2 from './image/sunglasses8.jpeg';
import sunglass3 from './image/sunglasses9.jpeg';
import w1 from './image/w2.jpg';
import w2 from './image/w3.jpeg';
import Header from "./Header";
import TestPage from "./TestPage";


function Home() {
  return (   
    <div className="home">
      <div className="home_container">
      <Header/>
      <img className="image" src={img5} />
        <div className="row">
          <Product
            id={'001'}
            title="Summer Shose"
            price={35.12}
            image={image}
            rating={2}
          />
          <Product
            id={'002'}
            title="Summer Sunglass"
            price={35.12}
            image={sunglass1}
            rating={2}
          />
        </div>
        <div className="row">
          <Product
            id={'003'}
            title="Black Sunglass"
            price={35.12}
            image={sunglass2}
            rating={2}
          />
          <Product
            id={'004'}
            title="UV Sunglass"
            price={35.12}
            image={sunglass3}
            rating={2}
          />
          <Product
            id={'005'}
            title="Cool wist watch"
            price={35.12}
            image={w1}
            rating={2}
          />
        </div>
        <div className="row">
          <Product
            id={'006'}
            title="Black watch"
            price={35.12}
            image={w2}
            rating={2}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
