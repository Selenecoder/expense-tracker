import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { fetchUserDetails } from "../services/ApiServices";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(
    location.state?.username || 
    sessionStorage.getItem('username') || 
    'User'
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.username) {
      sessionStorage.setItem('username', location.state.username);
      setUsername(location.state.username);
    }

    fetchUserDetails()
      .then(data => {
        if (data) {
          setUser(data);
          if (data.username) {
            setUsername(data.username);
            sessionStorage.setItem('username', data.username);
          }
        }
      })
      .catch(err => {
        setError("Failed to fetch user details");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.state?.username]);

  const chartData = [
    { month: "Jan", income: 4000, expense: 2400 },
    { month: "Feb", income: 3000, expense: 1398 },
    { month: "Mar", income: 5000, expense: 3800 },
    { month: "Apr", income: 2780, expense: 2908 },
    { month: "May", income: 6000, expense: 4000 },
  ];

  const pieChartData = [
    { name: "Entertainment", value: 400 },
    { name: "Vacation", value: 300 },
    { name: "Food & Drinks", value: 600 },
    { name: "Bills & Taxes", value: 500 },
    { name: "Savings", value: 200 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <h3>{error}</h3>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Welcome to VyaySigh, <b><i>{username}</i></b> 👋</h2>
          <p>Welcome to your expense tracker dashboard.</p>

          {/* Cards Section */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className="shadow-lg border-0" style={cardStyle}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Total Income</Card.Title>
                    <Card.Text>₹20,000</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-lg border-0" style={cardStyle}>
                <Card.Body>
                  <Card.Title>Total Expense</Card.Title>
                  <Card.Text>₹8,000</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-lg border-0" style={cardStyle}>
                <Card.Body>
                  <Card.Title>Total Balance</Card.Title>
                  <Card.Text>₹12,000</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row className="mt-4">
            <Col md={8}>
              <h4>Finance Statistics</h4>
              <Card className="p-3 shadow-sm border border-secondary rounded">
                <ResponsiveContainer width="100%" height={389}>
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#0d6efd" strokeWidth={2} />
                    <Line type="monotone" dataKey="expense" stroke="#dc3545" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col md={4}>
              <h5>All Expenses</h5>
              <Card className="p-3 shadow-sm border border-secondary rounded">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Transactions Table */}
          <Row className="mt-4">
            <Col>
              <h4>Recent Transactions</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-03-30</td>
                    <td>Groceries</td>
                    <td>Food</td>
                    <td>₹500</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="primary">Add Transaction</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const cardStyle = {
  background: "linear-gradient(135deg, rgb(13, 137, 253), #6610f2)",
  color: "white",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)"
};

export default Dashboard;
