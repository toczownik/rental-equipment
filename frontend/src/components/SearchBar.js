import React, { useEffect } from "react";
import { useState } from "react";
import {
  getPageItems,
  getPageItemsByNameAndCategories,
} from "../helpers/ItemHelper";
import { Container, ToggleButton, Row, Form, Button } from "react-bootstrap";

const SearchBar = ({ setItems }) => {
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

  const boxSearchStyle = {
    margin: "10px",
  };

  const cheackBoxStyle = {
    textAlign: "left",
    width: "100%",
  };

  const btnStyle = {
    margin: "0px",
    padding: "0px",
    width: "100%",
  };

  const searchFun = async () => {
    console.log(itemNameInput);
    let idCategories = "";
    for (let i = 0; i < chackeBox.length; i++) {
      if (chackeBox[i].checked === true) idCategories += chackeBox[i].id + ",";
    }
    idCategories = idCategories.substring(0, idCategories.length - 1);
    const res = await getPageItemsByNameAndCategories(
      itemNameInput,
      idCategories,
      0,
      12
    );
    res.json().then((r) => {
      setItems(r.content);
      console.log(r.content);
    });
  };

  return (
    <>
      <Container style={boxSearchStyle}>
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
              style={cheackBoxStyle}
              type="checkbox"
              variant="secondary"
              checked={category.checked}
              onChange={() => checkClick(category)}
              key={category.id}
            >
              {" "}
              {category.itemTypes}
            </ToggleButton>
          </Row>
        ))}
        <Row>
          <Button style={btnStyle} onClick={() => searchFun()}>
            Szukaj
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default SearchBar;
