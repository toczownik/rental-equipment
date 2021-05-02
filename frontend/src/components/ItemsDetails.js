import React, { useState, useEffect } from "react";
import { getItemById } from "../helpers/ItemHelper";
import "bootstrap/dist/css/bootstrap.min.css";
import { getIsLoginStorage } from "../helpers/HelperLocalStorage";
import { Button, Container, Row } from "react-bootstrap";
import DataPicker from "./DataPicker";
import { addNewRentail } from "../helpers/RentailHelper";
import { AlertError, AlertOk } from "./Alert";
import RentalingItem from "./RentalingItem";

const ItemDetails = ({ match }) => {
  const id = match.params.id;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showOkAlert, setShowOkAlert] = useState(false);

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

  const showAlerts = (code) => {
    if (code === 200) {
      setShowErrorAlert(false);
      setShowOkAlert(true);
    } else {
      setShowErrorAlert(true);
      setShowOkAlert(false);
    }
  };

  const [item, setItem] = useState({});

  const errorMsg = "Nie udało sie dokonać rezerwcji";
  const okMsg = "Udało ci się dokonać rezerwacji";

  return (
    <>
      {showErrorAlert && (
        <AlertError msg={errorMsg} setShow={setShowErrorAlert} />
      )}
      {showOkAlert && <AlertOk msg={okMsg} setShow={setShowOkAlert} />}
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
          <Button
            onClick={async (e) => {
              e.preventDefault();
              const status = await addNewRentail(item.id, startDate, endDate);
              showAlerts(status);
            }}
          >
            Dokonaj rezerwacji
          </Button>
          <hr />
          <RentalingItem id={id}></RentalingItem>
        </Container>
      )}
    </>
  );
};

export default ItemDetails;
