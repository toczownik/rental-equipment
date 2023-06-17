import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Container, Form} from "react-bootstrap";
import {addItem} from "../../helpers/ItemHelper";

const AddNewItem = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState("");
    const [categorySelected, setCategorySelected] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories () {
            const response = await fetch("http://localhost:8080/api/categories");
            response.json().then((t) => {
                for (let i = 0; i < t.length; i++) {
                }
                setCategories(t);
            });
        }
        getCategories();
    }, []);

    const DAY = 1;
    const HOUR = 2;

    const handleChange = (val) => {
        if (val.target.value === DAY) {
            setUnit("DAY");
        } else {
            setUnit("HOUR");
        }
    };

    const handleChangeCategory = (val) => {
        let temp = categories.find(cat => cat.id === parseInt(val.target.value));
        setCategorySelected([]);
        categorySelected.push(temp);
    };

    const getNameFromInput = (input) => {
        setName(input.target.value);
    };

    const getDescriptionFromInput = (input) => {
        setDescription(input.target.value);
    };

    const getPriceFromInput = (input) => {
        setPrice(input.target.value);
    };

    const checkForm = () => {
        if (name === "") return false;
        if (description === "") return false;
        if (!isNaN(price)) return false;
        if (unit === "") return false;
        return categorySelected.length !== 0;

    };

    return (
        <Container>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nazwa przedmiotu</Form.Label>
                    <Form.Control type="text" onChange={getNameFromInput}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Opis przedmiotu</Form.Label>
                    <Form.Control type="text" onChange={getDescriptionFromInput}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Cena przedmiotu</Form.Label>
                    <Form.Control type="text" onChange={getPriceFromInput}/>
                </Form.Group>
                <Form.Group controlId="formBasicRole">
                    <Form.Label>Rola użytkownika</Form.Label>
                    <ButtonGroup>
                        <Button type={"button"} value={DAY} onClick={handleChange}>Dzień</Button>
                        <Button type={"button"} value={HOUR} onClick={handleChange}>Godzina</Button>
                    </ButtonGroup>
                </Form.Group>
                <Form.Group controlId="formCategories">
                    <Form.Label>Wybierz kategorię</Form.Label>
                    <ButtonGroup>
                        {categories.map((category) => (
                            <Button key={category.id} type={"button"} value={category.id} onClick={handleChangeCategory}>
                                {category.itemTypes}
                            </Button>
                        ))}

                    </ButtonGroup>
                </Form.Group>
            </Form>
            <Button
                disabled={checkForm()}
                onClick={async () => {
                    const temp = await addItem({
                        name: name,
                        description: description,
                        pricePerUnit: price,
                        unit: unit,
                        available: true,
                        itemCorrect: true,
                        itemCategorySet: categorySelected,
                    });
                    console.log(temp);
                    alert(temp.status);
                }}
            >
                Dodaj przedmiot
            </Button>
        </Container>
    );
};

export default AddNewItem;
