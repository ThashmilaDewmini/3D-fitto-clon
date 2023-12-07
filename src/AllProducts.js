import React, { useState, useEffect  } from 'react';
import ProductCard from './ProductCard';
import './AllProducts.css';
import { juwe, watch, headwear, glass } from "./Data";
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Card from './Card';

const AllProducts = ({ searchTerm }) => {
  const [filteredJuwe, setFilteredJuwe] = useState([]);
  const [filteredWatch, setFilteredWatch] = useState([]);
  const [filteredHeadwear, setFilteredHeadwear] = useState([]);
  const [filteredGlass, setFilteredGlass] = useState([]);
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
        alert("Can't load the product beacuse of network or system error")
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search term
    
    setProducts(products.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm]);

  
  return (
    <div className="home-page">
      <center><u><h1 className='all-product'>Our Products</h1></u></center>
      <div className="product-list">
      {products.map((product) => (
          //<li key={product.id}>{product.productName} - ${product.productPrice}</li>
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;