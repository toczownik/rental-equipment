import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import { getEmailStorage } from "../helpers/HelperLocalStorage";

const logOut = () => {
  localStorage.clear();
  <Redirect to="/" />;
};

const Header = () => {
  const isLogin = localStorage.getItem("isLogin");

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Rentail ater Equipment</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/item">Items</Nav.Link>
          </Nav>
          <Nav>
            {!isLogin ? (
              <Nav.Link href="/formLogin">Login</Nav.Link>
            ) : (
              <LoggedUser />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const LoggedUser = () => {
  const mail = getEmailStorage();
  return (
    <>
      <Nav.Link href={`/userDatails/${mail}`}>
        <FaUserCircle />
      </Nav.Link>
      <Nav.Link href="formLogin" onClick={logOut}>
        <FaSignOutAlt />
      </Nav.Link>
    </>
  );
};

export default Header;
