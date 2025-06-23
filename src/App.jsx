import { useState, useEffect } from 'react'
import './App.css'


function Product() {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products/1")
      const data = await response.json();
      setProduct(data);
      
    }


  fetchProduct();
}, []);



  return ( product &&
<div>
  <h2>{product.title}</h2>
  <img src={product.image} alt={product.title} />
  <p><strong>Prix :</strong>{product.price} €</p>
  <p>{product.description}</p>
</div>
  );
}

export default Product;
