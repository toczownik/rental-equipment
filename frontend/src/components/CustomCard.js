import React from "react";
import { Card, Button } from "react-bootstrap";

const CustomCard = ({ title, text, imgUrl, linkRedirect, textBtn }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src={imgUrl} /> */}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant="primary" href={`${linkRedirect}`}>
            {textBtn}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CustomCard;
