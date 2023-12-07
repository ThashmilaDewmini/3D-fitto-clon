import React, { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import "./NewSlider.css";

import img1 from "./image/sImg1.jpg";
import img2 from "./image/sImg2.jpg";
import img3 from "./image/slidewatch.jpg";
import img4 from "./image/sImg4.jpg";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.7s ease;
  transform: translateX(${(props) => props.currentIndex * -100}vw);
`;

function NewNavbar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2, img3, img4];
  const title = ["SUNGLASSES","NECKLACE & EARRINGS","WATCHES","HATS & CAPS"];
  const decs = [
    "Latest fashionable sunglasses for you. Style with your own way...",
    "New fashionable necklace and earrings,  for any of your special events to be brightened..",
    "Keep a consistent movement despite the motions caused by the your's activities...",
    "Choose the best for you..."
  ];
  const sColor = ['#5cd5ea','#fff1cb',"#BDC6D9","#ff8080"];
  const linkShop = ['/category/c004',"/category/c002","/category/c003","/category/c001"];

  const handlePrevClick = (direction) => {
    if(direction === "left"){
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
    
  };

  const handleNextClick = (direction) => {
    if(direction === "right"){
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
    
  };
  

  return (
    <div className='slider-container'>
      <Arrow direction="left" onClick={() => handlePrevClick("left")}>
        <ArrowBackIos />
      </Arrow>

      <Wrapper className='s-container' style={{backgroundColor:sColor[currentIndex]}}>
      
        <div className='slider-img-container' >
          <img className='slider-img' src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        </div>
        <div className='slider-info-container' >
          <p className='s-title'>{title[currentIndex]}</p>
          <p className='s-desc'>{decs[currentIndex]}</p>
          <button><Link to={linkShop[currentIndex]} style={{ textDecoration: "none", color: "black" }}>SHOP NOW</Link></button>
        </div>
      </Wrapper>

      <Arrow direction="right" onClick={() => handleNextClick("right")}>
        <ArrowForwardIos />
      </Arrow>
    </div>
  );
}

export default NewNavbar;

