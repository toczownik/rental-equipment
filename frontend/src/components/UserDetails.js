import React, { useEffect, useState } from "react";
import {
  getEmailStorage,
  setEmailStorage,
} from "../helpers/HelperLocalStorage";
import { getUserByEmail, updateUser } from "../helpers/UserHelper";
import { ListGroup, Card, Button } from "react-bootstrap";
import { Form, Container } from "react-bootstrap";
import { AlertError } from "./Alert";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const [edit, setEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const email = getEmailStorage();
    getUserByEmail(email, setUserDetails);
  }, []);

  const msg = "Coś poszło nie tak :(";

  return (
    <>
      {showAlert && <AlertError msg={msg} setShow={setShowAlert} />}
      {!edit ? (
        <TempUserDetails userDetails={userDetails} setEdit={setEdit} />
      ) : (
        <TempFormUserDetails
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setEdit={setEdit}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

const TempUserDetails = ({ userDetails, setEdit }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Profil datils</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>name: {userDetails.firstName}</ListGroup.Item>
        <ListGroup.Item>surname: {userDetails.lastName}</ListGroup.Item>
        <ListGroup.Item>email: {userDetails.email}</ListGroup.Item>
        <ListGroup.Item>rola: {userDetails.userRole}</ListGroup.Item>
        <Button onClick={() => setEdit(true)}>Edit</Button>{" "}
      </ListGroup>
    </Card>
  );
};

const TempFormUserDetails = ({
  userDetails,
  setUserDetails,
  setEdit,
  setShowAlert,
}) => {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState(userDetails.id);

  const getEmailFromInput = (input) => {
    setEmail(input.target.value);
  };

  const getfirstNameFromInput = (input) => {
    setfirstName(input.target.value);
  };

  const getLastNameFromInput = (input) => {
    setLastName(input.target.value);
  };

  const handleResponse = (statusCode) => {
    if (statusCode === 200) {
      setUserDetails({
        id: userDetails.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userRole: userDetails.userRole,
      });
      setEdit(false);
      setEmailStorage(email);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Container className="formContainer">
        <Form className="MyFormLogin">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder={userDetails.firstName}
              defaultValue={userDetails.firstName}
              onChange={getfirstNameFromInput}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder={userDetails.lastName}
              defaultValue={userDetails.lastName}
              onChange={getLastNameFromInput}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={userDetails.email}
              defaultValue={userDetails.email}
              onChange={getEmailFromInput}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const status = updateUser({
                id: userDetails.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
              });
              status.then((statusCode) => {
                handleResponse(statusCode);
              });
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserDetails;
