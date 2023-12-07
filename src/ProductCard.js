import React, { useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const ProductCard = ({ product }) => {
  const [{ basket }, dispatch] = useStateValue();

  console.log("this is a basket>>", basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.id,
        title: product.productName,
        image: product.productImageUrl,
        price: product.productPrice,
      },
    });
  };
  return (
    <div className="product">
      <Link to={`/product/${product?.id}`} style={{ textDecoration: "none" }}>
        <div className="image-container">
          <img
            className="image"
            src={product?.productImageUrl}
            alt={product?.productName}
          />
        </div>
      </Link>

      <div className="detail-container">
        <h3>{product?.productName}</h3>
        <div className="under-details">
          <p className="price">${product?.productPrice}</p>
          <button className="btn" onClick={addToBasket}>
            ADD TO BUCKET
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
