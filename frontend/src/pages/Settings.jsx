// src/pages/Settings.jsx
import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

function Settings() {
  const [username, setUsername] = useState("your_username");
  const [email, setEmail] = useState("your_email@example.com");
  const [theme, setTheme] = useState("light");

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
    // TODO: Connect to backend
  };

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">Account Settings</h2>
      <Card className="p-4 shadow-lg">
        <Form onSubmit={handleSave}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="theme">
            <Form.Label>Theme Preference</Form.Label>
            <Form.Select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Save Changes</Button>
          </div>
        </Form>
      </Card>

      <Card className="p-4 shadow mt-4 border-danger">
        <h5 className="text-danger">Danger Zone</h5>
        <p>Deleting your account is irreversible. Please proceed with caution.</p>
        <Button variant="outline-danger">Delete Account</Button>
      </Card>
    </Container>
  );
}

export default Settings;
