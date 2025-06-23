import { useState, useEffect } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Button} from 'react-bootstrap';


function Product() {
  const [product, setProduct] = useState([]);
  const [newProductId, setNewProductId] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, []);


  

    async function addProduct() {
      const response = await fetch("https://fakestoreapi.com/products",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Nouveau produit",
          price: 29.99,
          description: "Un produit tout nouveau",
          image : "https://via.placeholder/150",
          category: "electronics",
        }),
    });
    const data = await response.json();
    setNewProductId(data.id);
    alert(`Le produit avec l'id ${data.id} a été créé`);
  }


  if (product.length === 0) {
    return <p>Chargement...</p>;
  }
  
  return (
  
  <Container className="py-4" >
    <Button variant="primary" onClick={addProduct}>Ajouter un produit</Button>
    <Row xs={1} md={4} className="g-3">
        {product.map(product => (
            <Col key={product.id} >
              <Card className="h-100">
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body >
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text > {product.description}</Card.Text>
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
