import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { AlertError } from "./Alert";
import axios from "axios";
import {
  setIsLoginStorage,
  setToken,
  setEmailStorage,
  setIdStorage,
  setRoleUser,
} from "../helpers/HelperLocalStorage";

import { getUserByEmail } from "../helpers/UserHelper";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const getEmailFromInput = (input) => {
    setEmail(input.target.value);
  };

  const getPasswordFromInput = (input) => {
    setPassword(input.target.value);
  };

  useEffect(() => {
    setShowAlert(false);
  }, []);

  const setVariableAfterLogin = (token) => {
    setShowAlert(false);
    setIsLoginStorage(true);
    setToken(token);
    setEmailStorage(email);
  };

  useEffect(() => {
    setIdStorage(userDetails.id);
    setRoleUser(userDetails.userRole);
  }, [userDetails]);

  const login = (e) => {
    e.preventDefault();

    const logIn = async () => {
      try {
        const response = await axios.post("http://localhost:8080/login", {
          username: email,
          password: password,
        });
        const token = response.data["Authorization"];
        setVariableAfterLogin(token);
        await getUserByEmail(email, setUserDetails);

        window.location.reload();
      } catch (error) {
        console.log(error);
        setShowAlert(true);
      }
    };
    logIn();
  };

  const msg = "Niepoprawne dane do autoryzacji :(";
  return (
    <>
      {showAlert && <AlertError msg={msg} setShow={setShowAlert} />}

      <Container className="formContainer">
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
        <Form.Text className="text-muted">
          Nie masz konta ? <a href="/registration">Rejestracja</a>
        </Form.Text>
      </Container>
    </>
  );
};

export default LoginForm;
