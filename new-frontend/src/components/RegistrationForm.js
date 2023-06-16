import React, { useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { signUp } from "../helpers/UserHelper";
import { AlertError } from "./Alert";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [validData, setValidData] = useState(false);
  const [regStatus200, setRegStatus200] = useState(false);

  const getEmailFromInput = (input) => {
    setEmail(input.target.value);
  };

  const getPasswordFromInput = (input) => {
    setPassword(input.target.value);
  };

  const getPasswordCheckFromInput = (input) => {
    setPasswordCheck(input.target.value);
  };

  const getFirstNameFromInput = (input) => {
    setFirstName(input.target.value);
  };

  const getLastNameFromInput = (input) => {
    setLastName(input.target.value);
  };

  const handleResponse = (res) => {
    console.log("odp= " + res);
    if (res === 200) {
      setRegStatus200(true);
    } else {
      setShowAlert(true);
      console.log("error");
    }
  };

  const validEmail = (_email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(_email);

  };

  const isValidData = () => {
    if (firstName === "" || lastName === "" || email === "" || password === "")
      return false;
    if (password !== passwordCheck) return false;
    return validEmail(email);

  };

  useEffect(() => {
    setValidData(isValidData());
  }, [firstName, lastName, email, password, passwordCheck]);

  const msg =
    "Nie zostały spłenione wszystkie warunki założenie konta: nazwa, unikalny mail w serwisie etc :(";

  return (
    <>
      {showAlert && <AlertError msg={msg} setShow={setShowAlert} />}

      <Container className="formContainer">
        {!regStatus200 && (
          <Form className="MyFormLogin">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                onChange={getFirstNameFromInput}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                onChange={getLastNameFromInput}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={getEmailFromInput}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={getPasswordFromInput}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                onChange={getPasswordCheckFromInput}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!validData}
              onClick={(e) => {
                e.preventDefault();
                const status = signUp({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                });
                status.then((statusCode) => {
                  handleResponse(statusCode);
                });
              }}
            >
              Sign up
            </Button>
          </Form>
        )}
        {regStatus200 && <RegisterOk />}
      </Container>
    </>
  );
};

const RegisterOk = () => {
  return (
    <>
      <p>Udało ci się założyć konto</p>
      <Button href="/formLogin">Zaloguj się</Button>
    </>
  );
};

export default RegistrationForm;
