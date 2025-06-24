import { useState, useEffect } from 'react'
import './App.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Button} from 'react-bootstrap';


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
          image : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          category: "electronics",
        }),
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été créé`);
  }

  async function changeProduct(id) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Produit modifié",
          price: 49.99,
          description: "Déscription modifiée",
          image : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          category: "electronics",
        }),
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été modifié`);
  }

  async function changePrice(id) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: 39.99,
        }),
    });
    const data = await response.json();
    alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
  }

  async function deleteProduct(id) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
        method: "DELETE",
    });
    const data = await response.json();
    alert(`Le prix du produit avec l'id ${data.id} a été supprimé`);
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
                  <Button variant="dark" onClick={() => changeProduct(product.id)}>Modifier le produit complet</Button>
                  <Button variant="success" onClick={() => changePrice(product.id)}>Modifier le prix du produit</Button>
                  <Button variant="danger" onClick={() => deleteProduct(product.id)}>Supprimer le produit</Button>
                </Card.Body>
              </Card>
            </Col>
            ))}
    </Row>
  </Container>
  );
}

export default Product;
