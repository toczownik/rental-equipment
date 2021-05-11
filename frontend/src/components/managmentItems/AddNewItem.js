import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { addItem } from "../../helpers/ItemHelper";

const AddNewItem = () => {
  //   const [item, setItem] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  const DAY = 1;
  const HOUR = 2;

  const handleChange = (val) => {
    if (val === DAY) {
      setUnit("DAY");
    } else {
      setUnit("HOUR");
    }
  };

  const getNameFromInput = (input) => {
    setName(input.target.value);
  };

  const getDescriptionFromInput = (input) => {
    setDescription(input.target.value);
  };

  const getPriceFromInput = (input) => {
    setPrice(input.target.value);
  };

  return (
    <Container className="formContainer">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nazwa przedmiotu</Form.Label>
          <Form.Control type="text" onChange={getNameFromInput} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Opis przedmiotu</Form.Label>
          <Form.Control type="text" onChange={getDescriptionFromInput} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Cena przedmiotu</Form.Label>
          <Form.Control type="text" onChange={getPriceFromInput} />
        </Form.Group>
        <Form.Group controlId="formBasicRole">
          <Form.Label>Rola użytkownika</Form.Label>
          <ToggleButtonGroup
            name="options"
            type="radio"
            value={"DAY"}
            onChange={handleChange}
            // defaultValue={item.unit === "DAY" ? DAY : HOUR}
          >
            <ToggleButton value={DAY}>Dzień</ToggleButton>
            <ToggleButton value={HOUR}>Godzina</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
      </Form>
      <Button
        onClick={async () => {
          const temp = await addItem({
            name: name,
            description: description,
            pricePerUnit: price,
            unit: unit,
            available: true,
            itemCorrect: true,
          });
          alert(temp.status);
        }}
      >
        Dodaj przedmioty
      </Button>
    </Container>
  );
};

export default AddNewItem;
