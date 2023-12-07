import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleProduct from './ProductDetail';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const ItemPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);

  // Find the product with the matching ID
 // const product = products.find((product) => product.id === parseInt(id));

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(productsRef);
      querySnapshot.forEach((doc) => {
        if(doc.id === id){
          setProduct({id: doc.id, ...doc.data()})
        }
      })
    } catch (error) {
      console.error(error);
    }
  };
  fetchProducts();
}, [id]);

  if (!product) {
    return <div>Loading......</div>;
  }
  return (
    <div className="product-page">
      <SingleProduct product={product} />
    </div>
  );
};

export default ItemPage;