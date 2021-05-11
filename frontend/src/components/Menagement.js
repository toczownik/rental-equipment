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
            />
          </Col>
          <Col>
            <CustomCard
              title={"Przedioty"}
              text={"tutej możesz edytować przedmioty"}
              imgUrl={""}
              linkRedirect={"/manegment/item"}
            />
          </Col>
          <Col>
            <CustomCard
              title={"wypozyczenia"}
              text={"tutej możesz edytować wypożyczenia"}
              imgUrl={""}
              linkRedirect={""}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Menagement;
