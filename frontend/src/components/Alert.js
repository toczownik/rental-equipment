import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Alert } from "react-bootstrap";

const AlertError = ({ msg, setShow }) => {
  return (
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{msg}</p>
    </Alert>
  );
};

export default AlertError;
