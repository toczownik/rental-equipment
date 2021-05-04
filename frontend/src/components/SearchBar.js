import React, { useEffect } from "react";
import { useState } from "react";

import { Container, ToggleButton, Row, Form, Button } from "react-bootstrap";

const SearchBar = () => {
  const [chackeBox, setCheckBox] = useState([]);
  const [itemNameInput, setItemNameInput] = useState("");

  function getRandomInt() {
    const max = 1111111111111;
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:8080/api/categories");
      response.json().then((t) => {
        for (let i = 0; i < t.length; i++) {
          Object.assign(t[i], { checked: false });
        }
        setCheckBox(t);
        console.log(t);
      });
    }
    getCategories();
  }, []);

  const checkClick = (_chackeBox) => {
    let index = _chackeBox.id;
    setCheckBox(
      chackeBox.map((item) =>
        item.id === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getNameFromInput = (input) => {
    setItemNameInput(input.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <Form.Control
            type="text"
            placeholder="Wpisz nazwe do wyszukiwania"
            onChange={getNameFromInput}
          />
        </Row>
        {chackeBox.map((category) => (
          <Row key={getRandomInt()}>
            <ToggleButton
              type="checkbox"
              variant="secondary"
              checked={category.checked}
              value="1"
              onChange={() => checkClick(category)}
              key={category.id}
            >
              {category.itemTypes}
            </ToggleButton>
          </Row>
        ))}
        <Button>Szukaj</Button>
      </Container>
    </>
  );
};

export default SearchBar;
