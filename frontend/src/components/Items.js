import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { getAllItems, getNumeberItems } from "../helpers/ItemHelper";
import Pageable from "./Pageable";

const Items = () => {
  const [items, setItems] = useState([]);
  const [countItems, setCountItems] = useState(0);

  useEffect(() => {
    getAllItems(setItems);
    getNumeberItems(setCountItems);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Pageable countItems={countItems}></Pageable>
    </Container>
  );
};

export default Items;
