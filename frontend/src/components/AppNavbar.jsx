// src/components/Navbar.jsx
import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar({username}) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img alt="VyaySigh_logo" src="/logo-VyaySigh.png" width="30" height="30" className="d-inline-block align-top me-2" />
          <Navbar.Text className="ms-auto text-light"> VyaySigh<b>{username}</b></Navbar.Text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard"></Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>

          {/* Welcome Message */}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
