import React, { useEffect } from "react";
import { useState } from "react";
import { getPageItemsByNameAndCategories } from "../helpers/ItemHelper";
import { Container, ToggleButton, Row, Form, Button } from "react-bootstrap";

const SearchBar = ({
  setItems,
  itemNameInput,
  setItemNameInput,
  idCategories,
  setIdCategories,
  setCountItems,
}) => {
  const [chackeBox, setCheckBox] = useState([]);

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
    let tempIdCategories = "";
    for (let i = 0; i < chackeBox.length; i++) {
      if (chackeBox[i].checked === true)
        tempIdCategories += chackeBox[i].id + ",";
    }
    tempIdCategories = tempIdCategories.substring(
      0,
      tempIdCategories.length - 1
    );
    //todo sprawdzic po co to jest
    setIdCategories(tempIdCategories);
    const res = await getPageItemsByNameAndCategories(
      itemNameInput,
      tempIdCategories,
      0,
      12
    );
    res.json().then((r) => {
      setCountItems(r.totalElements);
      setItems(r.content);
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
