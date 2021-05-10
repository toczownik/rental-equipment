import React, { useEffect, useState } from "react";
import {
  ListGroup,
  Col,
  Row,
  Button,
  Form,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { setEmailStorage } from "../../helpers/HelperLocalStorage";
import { getAllUsers, updateUserWithRole } from "../../helpers/UserHelper";

const UserMangemnt = () => {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    const response = await getAllUsers();

    response.json().then((t) => {
      for (let i = 0; i < t.length; i++) {
        Object.assign(t[i], { edit: false });
      }
      setUsers(t);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    fetchData();
  };

  const clickEditUser = (userToEdit) => {
    let index = userToEdit.id;
    setUsers(
      users.map((item) =>
        item.id === index ? { ...item, edit: !item.edit } : item
      )
    );
  };

  return (
    <>
      <ListGroup className="my-2" horizontal={2}>
        {users.map((user) => (
          <ListGroup.Item key={user.id}>
            <Row>
              <Col>{user.id}</Col>
              <Col>{user.firstName}</Col>
              <Col>{user.lastName}</Col>
              <Col>{user.email}</Col>
              <Col>{user.userRole}</Col>
              <Col>
                <Button
                  onClick={() => {
                    clickEditUser(user);
                  }}
                >
                  Edytuj
                </Button>{" "}
              </Col>
            </Row>
            {user.edit && (
              <UserEdit
                user={user}
                clickEditUser={clickEditUser}
                refresh={refresh}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

const UserEdit = ({ user, clickEditUser, refresh }) => {
  const USER_ROLE = 1;
  const ADMIN_ROLE = 2;

  const [email, setEmail] = useState(user.email);
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [role, setRole] = useState(user.userRole);

  const getEmailFromInput = (input) => {
    setEmail(input.target.value);
  };

  const getfirstNameFromInput = (input) => {
    setfirstName(input.target.value);
  };

  const getLastNameFromInput = (input) => {
    setLastName(input.target.value);
  };

  const handleChange = (val) => {
    if (val === USER_ROLE) {
      setRole("ROLE_USER");
    } else {
      setRole("ROLE_ADMIN");
    }
  };

  const handleResponse = (statusCode) => {
    if (statusCode === 200) {
      setEmailStorage(email);
      clickEditUser(user);
      refresh();
    } else {
      alert("error");
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
              placeholder={user.firstName}
              defaultValue={user.firstName}
              onChange={getfirstNameFromInput}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder={user.lastName}
              defaultValue={user.lastName}
              onChange={getLastNameFromInput}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={user.email}
              defaultValue={user.email}
              onChange={getEmailFromInput}
            />
          </Form.Group>
          <Form.Group controlId="formBasicRole">
            <Form.Label>Rola użytkownika</Form.Label>
            <ToggleButtonGroup
              name="options"
              type="radio"
              value={user.ROLE_USER}
              onChange={handleChange}
              defaultValue={
                user.userRole === "ROLE_USER" ? USER_ROLE : ADMIN_ROLE
              }
            >
              <ToggleButton value={USER_ROLE}>Użytkownik</ToggleButton>
              <ToggleButton value={ADMIN_ROLE}>Admin</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              //todo pomyslec o hasle
              e.preventDefault();
              const status = updateUserWithRole({
                id: user.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                userRole: role,
              });
              status.then((statusCode) => {
                handleResponse(statusCode);
              });
            }}
          >
            Zapisz
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserMangemnt;
