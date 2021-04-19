import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import AlertError from "./Alert";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const getEmailFromInput = (input) => {
    setEmail(input.target.value);
  };

  const getPasswordFromInput = (input) => {
    setPassword(input.target.value);
  };

  useEffect(() => {
    setShowAlert(false);
  }, []);

  const login = (e) => {
    e.preventDefault();
    console.log("email: " + email);
    console.log("pass: " + password);

    const requestMsg = {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    };
    const fetchTest = async () => {
      const data = await fetch("http://localhost:8080/login", requestMsg);
      try {
        const jwt = await data.json();
        console.log(jwt);
      } catch (error) {
        setShowAlert(true);
      }
    };

    fetchTest();
  };

  return (
    <>
      <Container className="formContainer">
        {showAlert && (
          <AlertError setShow={("nie poprawne dane logowania", setShowAlert)} />
        )}
        <Form className="MyFormLogin">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={getEmailFromInput}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={getPasswordFromInput}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={login}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
