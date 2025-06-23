import { useState, useEffect } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

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

  if (product.length === 0) {
    return <p>Chargement...</p>;
  }
  
  return (
  <Container className="py-4">
  <Row xs={1} md={4} className="g-3">
      {product.map(product => (
          <Col key={product.id} >
          <Card className="h-100">
          <Card.Img variant="top" src={product.image} alt={product.title} className="product-image"/>
          <Card.Body >
            <Card.Title>{product.title}</Card.Title>
            <Card.Text className="description"> {product.description}</Card.Text>
            <Card.Text>Prix : {product.price} €</Card.Text>
          </Card.Body>
        </Card>
        </Col>
      ))}
    </Row>
    </Container>
  );
}

export default Product;
