import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import ProductCard from "./ProductCard";
import './Viewproduct.css';
import image from "../src/image/CAP.jpg"
import { Link } from "react-router-dom";
import Card from "./Card";

function Viweproduct() {
    const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);
        const productData = [];
        querySnapshot.forEach((doc) => {
          productData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []); // Add an empty dependency array to run the effect only once

  const addToCart = (product) => {
    // Implement the logic to add the product to the cart here.
    console.log(`Added to cart: ${product.name}`);
  };
  
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          //<li key={product.id}>{product.productName} - ${product.productPrice}</li>
          <Card key={product.id} product={product} onAddToCart={addToCart}/>
        ))}
      </ul>
    </div>
  );
}

export default Viweproduct;
