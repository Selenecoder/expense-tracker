// src/pages/Statistics.jsx

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const categoryData = [
  { name: 'Groceries', value: 2500 },
  { name: 'Utilities', value: 1800 },
  { name: 'Transport', value: 1000 },
  { name: 'Entertainment', value: 1200 },
];

const monthlyData = [
  { month: 'Jan', expense: 3500 },
  { month: 'Feb', expense: 4200 },
  { month: 'Mar', expense: 3900 },
  { month: 'Apr', expense: 4800 },
  { month: 'May', expense: 3000 },
];

const Statistics = () => {
  const total = categoryData.reduce((sum, cat) => sum + cat.value, 0);
  const highest = categoryData.reduce((a, b) => (a.value > b.value ? a : b));

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Statistics</h3>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Total Spent</h5>
            <p className="fs-4 fw-bold text-primary">₹{total}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Top Category</h5>
            <p className="fs-5 text-success">{highest.name} (₹{highest.value})</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>Avg per Category</h5>
            <p className="fs-5 text-muted">₹{(total / categoryData.length).toFixed(0)}</p>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={6}>
          <Card className="p-3 shadow-sm mb-4">
            <h5 className="text-center mb-3">Expenses by Category</h5>
            <div className="d-flex justify-content-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col md={12} lg={6}>
          <Card className="p-3 shadow-sm mb-4">
            <h5 className="text-center mb-3">Monthly Expense Trend</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expense" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Statistics;
