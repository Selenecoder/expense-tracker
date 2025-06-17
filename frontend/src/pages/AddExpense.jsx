import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
 

function AddExpense() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense submitted:", formData);
    // Reset form
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    });
  };

  return (
    <Container className="py-4">
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="mb-4">Add New Expense</h2>
        <Card className="p-4 shadow-sm border border-info">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Expense Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Grocery shopping"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g. 500"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Choose a category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formNotes">
              <Form.Label>Notes (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Any additional details"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </Form>
        </Card>
      </div>
    </Container>
  );
}

export default AddExpense;
