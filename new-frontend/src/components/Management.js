import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import CustomCard from "./CustomCard";

const Management = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <CustomCard
              title={"Użytkownicy"}
              text={"Tutaj możesz edytować użytkowników"}
              imgUrl={""}
              linkRedirect={"/management/user"}
              textBtn={"Edytuj"}
            />
          </Col>
          <Col>
            <CustomCard
              title={"Przedmioty"}
              text={"Tutaj możesz edytować przedmioty"}
              imgUrl={""}
              linkRedirect={"/management/item"}
              textBtn={"Edytuj"}
            />
          </Col>
          <Col>
            <CustomCard
              title={"Przedmioty"}
              text={"Tutaj możesz dodać przedmioty"}
              imgUrl={""}
              linkRedirect={"/addItem/"}
              textBtn={"Dodaj"}
            />
          </Col>
          <Col>
            <CustomCard
              title={"Wypożyczenia"}
              text={"Tutaj możesz przegladać wypożyczenia i je usuwać"}
              imgUrl={""}
              linkRedirect={"/management/rentals"}
              textBtn={"Edytuj"}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Management;
