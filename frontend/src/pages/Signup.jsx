import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '', username: '', email: '', password: ''
  });
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset previous errors before sending request

    try {
      const response = await axios.post("/api/auth/signup", formData);

      if (response.data && response.data.token) {
        sessionStorage.setItem("jwt", response.data.token);
        navigate("/dashboard", {
          state: { username: response.data.username },
          replace: true
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <Card style={{ width: "24rem", padding: '1.5rem', height: "auto" }} className="p-4 shadow">
        <Card.Body>
          <h3 className="mb-4 text-center">
            Create an Account On <b><i>VyaySigh</i></b>
          </h3>

          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
            </Button>
          </Form>

          {error && <div className="mt-3 text-danger">{error}</div>}

          <div className="mt-3 text-center">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;
