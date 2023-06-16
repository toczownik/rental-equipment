import React, { useEffect, useState } from "react";
import ItemDetails from "../../ItemDetails";
import {
  Button,
  Form,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { updateItem, getItemByIdFetch } from "../../helpers/ItemHelper";
const EditItemDetails = () => {
  const [item, setItem] = useState({});
  const id = window.location.href.replace("http://localhost:3000/editItem/", "");


  return (
    <>
      <ItemDetails itemId={id} item={item} setItem={setItem} />
      <EditItemForm itemId={id} />
    </>
  );
};

const EditItemForm = () => {
  const id = window.location.href.replace("http://localhost:3000/editItem/", "");
  const [item, setItem] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await getItemByIdFetch(id);
      response.json().then((t) => {
        console.log(t);
        setItem(t);
        setName(t.name);
        setDescription(t.description);
        setPrice(t.pricePerUnit);
        setUnit(t.unit);
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Form.Control
            type="text"
            placeholder={item.name}
            defaultValue={item.name}
            onChange={getNameFromInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Opis przedmiotu</Form.Label>
          <Form.Control
            type="text"
            placeholder={item.description}
            defaultValue={item.description}
            onChange={getDescriptionFromInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Cena przedmiotu</Form.Label>
          <Form.Control
            type="text"
            placeholder={item.pricePerUnit}
            defaultValue={item.pricePerUnit}
            onChange={getPriceFromInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicRole">
          <Form.Label>Jednostka wypożycznia</Form.Label>
          <ToggleButtonGroup
            name="options"
            type="radio"
            value={item.unit}
            onChange={handleChange}
            defaultValue={item.unit === "DAY" ? DAY : HOUR}
          >
            <ToggleButton value={DAY}>Dzień</ToggleButton>
            <ToggleButton value={HOUR}>Godzina</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
      </Form>
      <Button
        onClick={async () => {
          const temp = await updateItem({
            id: item.id,
            name: name,
            description: description,
            pricePerUnit: price,
            unit: unit,
            itemCategorySet: item.itemCategorySet,
            itemLeasedSet: item.itemLeasedSet,
            itemPermissionWrappers: item.itemPermissionWrappers,
          });

          if (temp.status === 200) window.location.reload(false);
        }}
      >
        Aktulizuj informacje
      </Button>
    </Container>
  );
};

export default EditItemDetails;
