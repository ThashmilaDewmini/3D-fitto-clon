import React, { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  width:70px;
  height:70px
`
const Title = styled.p`
  font-size:15px;
`
const Price = styled.p`
  font-size:12px;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
`
const List = styled.div`
display: flex;
align-items:center;

`
function CheckoutProduct ( {id, image, title, price} ) {
  
  return (
    <div>
      <List className="checkout_product">
      <Image className="checkout_img" src={image} />
      <Info className="product_info">
        <Title className="product_title">{title}</Title>
        <Price className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </Price>
        
        
      </Info>
      
    </List>
    </div>
    
  );
}

export default CheckoutProduct;