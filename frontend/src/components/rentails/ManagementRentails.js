import React, { useEffect, useState } from "react";
import {
  Col,
  ListGroup,
  Row,
  Button,
  Container,
  Jumbotron,
} from "react-bootstrap";
import {
  getPageOfRentails,
  deleteRentailById,
} from "../../helpers/RentailHelper";

const ManagementRentails = () => {
  const [rentails, setRentails] = useState([]);

  const isEmpty = () => {
    return rentails.length === 0 ? true : false;
  };

  async function fetchData() {
    //pagesie -> now 12 is set in Pageable.js file to
    const response = await getPageOfRentails(0, 12);
    response.json().then((response) => {
      setRentails(response.content);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    fetchData();
  };

  return (
    <>
      <Container fluid>
        {isEmpty() && (
          <Jumbotron>
            <h1>Brak rezerwacji!</h1>
          </Jumbotron>
        )}
        {!isEmpty() && (
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Id</Col>
                <Col>Cena</Col>
                <Col>Od</Col>
                <Col>Do</Col>
                <Col>Jednostka</Col>
                {/* <Col>Rabat</Col> */}
                <Col>Koszt całkowity</Col>
                <Col></Col>
              </Row>
            </ListGroup.Item>
            {rentails.map((rentail) => (
              <ListGroup.Item key={rentail.id}>
                <Row>
                  <Col>{rentail.id}</Col>
                  <Col>{rentail.pricePerUnit}</Col>
                  <Col>{rentail.timeFrom}</Col>
                  <Col>{rentail.timeTo}</Col>
                  <Col>{rentail.unit}</Col>
                  {/* <Col>{rentail.discount}zł</Col> */}
                  <Col>{rentail.totalPrice}zł</Col>
                  <Col>
                    <Button
                      onClick={async () => {
                        await deleteRentailById(rentail.id);
                        refresh();
                      }}
                    >
                      Usuń
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </>
  );
};

export default ManagementRentails;
