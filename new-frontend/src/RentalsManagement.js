import React, {useEffect, useState} from "react";
import {Button, Col, Container, ListGroup, Row,} from "react-bootstrap";
import {deleteRentalById, getPageOfRentals} from "./helpers/RentalHelper";

const RentalsManagement = () => {
    const [rentals, setRentals] = useState([]);

    const isEmpty = () => {
        return rentals.length === 0;
    };

    async function fetchData () {
        const response = await getPageOfRentals(0, 12);
        response.json().then((response) => {
            setRentals(response.content);
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
                    <div>
                        <h1>Brak rezerwacji!</h1>
                    </div>
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
                        {rentals.map((rental) => (
                            <ListGroup.Item key={rental.id}>
                                <Row>
                                    <Col>{rental.id}</Col>
                                    <Col>{rental.pricePerUnit}</Col>
                                    <Col>{rental.timeFrom}</Col>
                                    <Col>{rental.timeTo}</Col>
                                    <Col>{rental.unit}</Col>
                                    {/* <Col>{rentail.discount}zł</Col> */}
                                    <Col>{rental.totalPrice}zł</Col>
                                    <Col>
                                        <Button
                                            onClick={async () => {
                                                await deleteRentalById(rental.id);
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

export default RentalsManagement;
