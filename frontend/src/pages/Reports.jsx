// src/pages/Reports.jsx

import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const reportRef = useRef();

  const dummyData = [
    { date: '2025-05-01', category: 'Groceries', amount: 1200, description: 'Big Bazaar' },
    { date: '2025-05-02', category: 'Utilities', amount: 800, description: 'Electricity Bill' },
    { date: '2025-05-03', category: 'Transport', amount: 300, description: 'Uber' },
  ];

  const filteredData = dummyData.filter(tx => {
    const matchCategory = category === '' || tx.category === category;
    const matchStart = startDate === '' || new Date(tx.date) >= new Date(startDate);
    const matchEnd = endDate === '' || new Date(tx.date) <= new Date(endDate);
    return matchCategory && matchStart && matchEnd;
  });

  const totalExpense = filteredData.reduce((sum, tx) => sum + tx.amount, 0);

  const exportCSV = () => {
    const headers = 'Date,Category,Amount,Description\n';
    const rows = filteredData.map(tx => `${tx.date},${tx.category},${tx.amount},${tx.description}`).join('\n');
    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense_report.csv';
    a.click();
  };

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: 'Expense_Report',
  });

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Reports</h3>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Total Income</h6>
            <p className="fs-5 text-success">₹10,000</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Total Expense</h6>
            <p className="fs-5 text-danger">₹{totalExpense}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Net Savings</h6>
            <p className="fs-5 text-primary">₹{10000 - totalExpense}</p>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Transport">Transport</option>
          </Form.Select>
        </Col>
        <Col md={3} className="d-flex gap-2">
          <Button variant="primary" onClick={exportCSV}>Export CSV</Button>
          <Button variant="secondary" onClick={handlePrint}>Print PDF</Button>
        </Col>
      </Row>

      <div ref={reportRef}>
        <Card className="p-3 shadow-sm mb-4">
          <h5>Expense Table</h5>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.date}</td>
                  <td>{tx.category}</td>
                  <td>₹{tx.amount}</td>
                  <td>{tx.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </Container>
  );
};

export default Reports;
