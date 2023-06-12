import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { getPageItems } from "../helpers/ItemHelper";
import Pageable from "./Pageable";
import SearchBar from "./SearchBar";

const Items = ({ text, baseUrl }) => {
    const [items, setItems] = useState([]);
    const [countItems, setCountItems] = useState(0);

    //do przekazania
    const [itemNameInput, setItemNameInput] = useState("");
    const [idCategories, setIdCategories] = useState("");

    useEffect(() => {
        async function fetchData() {
            //pagesie -> now 12 is set in Pageable.js file to
            const response = await getPageItems(0, 12);
            response.json().then((response) => {
                setItems(response.content);
                setCountItems(response.totalElements);
            });
        }
        fetchData();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col xl={2}>
                    <SearchBar
                        setItems={setItems}
                        itemNameInput={itemNameInput}
                        setItemNameInput={setItemNameInput}
                        idCategories={idCategories}
                        setIdCategories={setIdCategories}
                        setCountItems={setCountItems}
                    ></SearchBar>
                </Col>
                <Col xl={2}></Col>
                <Col>
                    <Row>
                        {items.map((item) => (
                            <Card key={item.id} style={{ width: "18rem" }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                    <Button href={`${baseUrl}${item.id}`}>{text}</Button>{" "}
                                </Card.Body>
                            </Card>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Pageable
                countItems={countItems}
                setItems={setItems}
                itemNameInput={itemNameInput}
                idCategories={idCategories}
                setIdCategories={setIdCategories}
            ></Pageable>
        </Container>
    );
};

export default Items;
