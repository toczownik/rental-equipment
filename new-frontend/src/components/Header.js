import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {redirect} from "react-router-dom";
import {FaSignOutAlt, FaUserCircle} from "react-icons/fa";
import {
    getEmailStorage,
    getUserRoleStorage,
} from "../helpers/LocalStorageHelper";

const logOut = () => {
    localStorage.clear();
    redirect("/");
};

const Header = () => {
    const isLogin = localStorage.getItem("isLogin");
    const userRole = getUserRoleStorage();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Rental Water Equipment</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/item">Items</Nav.Link>
                        {userRole === "ROLE_ADMIN" && (
                            <Nav.Link href="/management">Management</Nav.Link>
                        )}
                        {userRole === "ROLE_ADMIN" && (
                            <Nav.Link href="/analytics">Analytics</Nav.Link>
                        )}
                    </Nav>
                    <Nav style={{ float: "left" }}>
                        {!isLogin ? (
                            <Nav.Link href="/formLogin">Login</Nav.Link>
                        ) : (
                            <LoggedUser/>
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
            <Nav.Link href={`/userDetails/${mail}`}>
                <FaUserCircle/>
            </Nav.Link>
            <Nav.Link href="formLogin" onClick={logOut}>
                <FaSignOutAlt/>
            </Nav.Link>
        </>
    );
};

export default Header;
