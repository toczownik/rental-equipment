import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import CustomCard from "./CustomCard";

const Menagement = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <CustomCard
              title={"Użytkownicy"}
              text={"tutej możesz edytowac użytkowników"}
              imgUrl={"user.png"}
              linkRedirect={"/manegment/user"}
              textBtn={"Edytuj"}
            />
          </Col>
          <Col>
            <CustomCard
              title={"Przedioty"}
              text={"tutej możesz edytować przedmioty"}
              imgUrl={""}
              linkRedirect={"/manegment/item"}
              textBtn={"Edytuj"}
            />
          </Col>
          <Col>
            <CustomCard
              title={"Przedioty"}
              text={"tutej możesz dodać przedmioty"}
              imgUrl={""}
              linkRedirect={"/addItem/"}
              textBtn={"Dodaj"}
            />
          </Col>
          <Col>
            <CustomCard
              title={"Wypozyczenia"}
              text={"tutej możesz przegladać wypozyczenia i je usuwać"}
              imgUrl={""}
              linkRedirect={"/manegment/rentails"}
              textBtn={"Edytuj"}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Menagement;
