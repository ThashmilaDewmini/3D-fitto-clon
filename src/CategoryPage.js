import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";

const categoryNames = {
  c001: "Cap & Hat",
  c002: "Jewelry",
  c003: "Watch",
  c004: "Sunglass",
};
function CategoryPage() {
  const { categoryID } = useParams();
  const [products, setProducts] = useState([]);
  const [title] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("categoryID", "==", categoryID));
      const querySnapshot = await getDocs(q);
      const productData = [];
      querySnapshot.forEach((doc) => {
        productData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productData);
    };

    fetchProducts();
  }, [categoryID]);

  return (
    <div>
      <Navbar />
      <div className="home-page">
        <u>
          <h1 className="all-product">{categoryNames[categoryID]}</h1>
        </u>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <h2></h2>
    </div>
  );
}

export default CategoryPage;
