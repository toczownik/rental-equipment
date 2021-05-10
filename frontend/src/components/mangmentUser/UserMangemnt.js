import React, { useEffect, useState } from "react";
import { ListGroup, Col, Row, Button } from "react-bootstrap";
import { getAllUsers } from "../../helpers/UserHelper";

const UserMangemnt = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllUsers();

      response.json().then((t) => {
        setUsers(t);
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <ListGroup className="my-2" horizontal={2}>
        {users.map((user) => (
          <ListGroup.Item key={user.id}>
            <Row>
              <Col>{user.id}</Col>
              <Col>{user.firstName}</Col>
              <Col>{user.email}</Col>
              <Col>{user.userRole}</Col>
              <Col>
                <Button>Edytuj</Button>{" "}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default UserMangemnt;
