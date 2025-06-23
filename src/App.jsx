import { useState, useEffect } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';

function Product() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProduct(data);
    }

    fetchProduct();
  }, []);

  if (product.lenght === 0) {
    return <p>Chargement...</p>;
  }
  console.log(product);
  return (
  <div className="product-container">
      {product.map(product => (
        <Card key={product.id} className="product-card">
          <Card.Img variant="top" src={product.image} alt={product.title} className="product-image"/>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text className="description"> {product.description}</Card.Text>
            <p><strong>Prix :</strong> {product.price} €</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Product;
