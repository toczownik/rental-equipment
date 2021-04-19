import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:8080/api/items");

    const items = await data.json();
    setItems(items);
  };

  return (
    <Container>
      <Row>
        {items.map((item) => (
          <Card key={item.id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Button href={`/item/${item.id}`}>Read more</Button>{" "}
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Items;
