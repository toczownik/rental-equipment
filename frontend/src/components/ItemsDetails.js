import React, { useState, useEffect } from "react";
import { getItemById } from "../helpers/ItemHelper";
import "bootstrap/dist/css/bootstrap.min.css";
import { getIsLoginStorage } from "../helpers/HelperLocalStorage";
import { Button, Container, Row } from "react-bootstrap";
import DataPicker from "./DataPicker";

const ItemDetails = ({ match }) => {
  const id = match.params.id;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const tempTotalPrice = calculateTotalPrice();
    setTotalPrice(tempTotalPrice);
  }, [startDate, endDate]);

  const calculateTotalPrice = () => {
    return (
      Math.round(item.pricePerUnit * timeDiffInDay(startDate, endDate) * 100) /
      100
    );
  };

  const timeDiffInDay = (t1, t2) => {
    return Math.ceil((t2 - t1) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    getItemById(id, setItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [item, setItem] = useState({});

  return (
    <>
      <div>
        <h2>Name of product: {item.name}</h2>
        <h3>Description: {item.description}</h3>
        <h3>Price per Unit: {item.pricePerUnit}</h3>
        <h3>Unit: {item.unit}</h3>
        <hr />
      </div>
      {getIsLoginStorage() && (
        <Container>
          <Row>
            <DataPicker
              label={"Wybierz datę początku rezerwacji"}
              date={startDate}
              setDate={setStartDate}
            ></DataPicker>
          </Row>
          <Row>
            <DataPicker
              label={"Wybierz datę końca rezerwacji"}
              date={endDate}
              setDate={setEndDate}
            ></DataPicker>
          </Row>
          <Row>
            {totalPrice >= 0 ? (
              <h2>Cena całkowita: {totalPrice} zł</h2>
            ) : (
              <h2>Źle ustawione wartości</h2>
            )}
          </Row>
          <Button>Dokonaj rezerwacji</Button>
        </Container>
      )}
    </>
  );
};

export default ItemDetails;
