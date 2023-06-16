import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { addItem } from "../../helpers/ItemHelper";

//TODO naprawić tworzenie

const AddNewItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [categorySelected, setCategorySelected] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:8080/api/categories");
      response.json().then((t) => {
        for (let i = 0; i < t.length; i++) {}
        setCategories(t);
      });
    }
    getCategories();
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

  const handleChangeCategory = (val) => {
    let temp = categories.filter((categry) => {
      return categry.id === val;
    });
    setCategorySelected(temp);
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

  const checkForm = () => {
    if (name === "") return false;
    if (description === "") return false;
    if (!isNaN(price)) return false;
    if (unit === "") return false;
    if (categorySelected.length === 0) return false;
    return true;
  };

  return (
    <Container>
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
          >
            <ToggleButton value={DAY}>Dzień</ToggleButton>
            <ToggleButton value={HOUR}>Godzina</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group controlId="formCategories">
          <Form.Label>Wybierz kategorie</Form.Label>
          <ToggleButtonGroup
            name="categories"
            type="radio"
            onChange={handleChangeCategory}
          >
            {categories.map((category) => (
              <ToggleButton key={category.id} value={category.id}>
                {category.itemTypes}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Form.Group>
      </Form>
      <Button
        disabled={checkForm()}
        onClick={async () => {
          const temp = await addItem({
            name: name,
            description: description,
            pricePerUnit: price,
            unit: unit,
            available: true,
            itemCorrect: true,
            itemCategorySet: categorySelected,
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
