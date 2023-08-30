import React from "react";
import "./Product.css";
import {useStateValue} from "./StateProvider";

function Product({ id, title, image, price, rating }) {

  const [{basket}, dispatch] = useStateValue();
  console.log('this is a basket>>',basket);
  const addToBasket = () =>{
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="info">
        <p>{title}</p>
        <p className="price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#11088;</p>
            ))}
        </div>
      </div>
      <img src={image} />
      <button onClick={addToBasket}>Add To Backet</button>
    </div>
  );
}

export default Product;

