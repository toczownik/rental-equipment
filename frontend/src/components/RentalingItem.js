import React from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { getAllRentailWithIdItem } from "../helpers/RentailHelper";
import { useState, useEffect } from "react";

const RentalingItem = ({ id }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllRentailWithIdItem(id, setItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toHumanReadable = (data) => {
    const _data = new Date(data);
    return _data.toDateString();
  };

  return (
    <Container>
      <Row>
        {items.length > 0 && (
          <h3>
            Ten przedmiot jest zerezerwowany w następnych terminach uwzględnij
            to przy rezerwacji:
          </h3>
        )}
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item key={item.id}>
              Od: {toHumanReadable(item.timeFrom)} Do:{" "}
              {toHumanReadable(item.timeTo)}{" "}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default RentalingItem;
