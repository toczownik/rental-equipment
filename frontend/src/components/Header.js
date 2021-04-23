import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const logOut = () => {
  localStorage.clear();
  <Redirect to="/" />;
};

const Header = () => {
  const isLogin = localStorage.getItem("isLogin");
  // const logOut = () => {
  //   localStorage.clear();
  //   <Redirect to="/" />;
  // };

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
  return (
    <>
      <Nav.Link>Witaj nazwa</Nav.Link>
      <Nav.Link href="formLogin" onClick={logOut}>
        <FaUserCircle />
      </Nav.Link>
      <Nav.Link href="formLogin" onClick={logOut}>
        <FaSignOutAlt />
      </Nav.Link>
    </>
  );
};

export default Header;
