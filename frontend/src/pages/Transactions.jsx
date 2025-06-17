import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Table,
  Button,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';

const dummyTransactions = [
  { id: 1, date: '2025-05-01', category: 'Groceries', amount: 1200, description: 'Big Bazaar' },
  { id: 2, date: '2025-05-02', category: 'Utilities', amount: 800, description: 'Electricity Bill' },
  { id: 3, date: '2025-05-03', category: 'Transport', amount: 300, description: 'Uber' },
];

const Transactions = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarView, setCalendarView] = useState(false);

  const filteredTransactions = dummyTransactions
    .filter(
      (t) =>
        t.description.toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter === '' || t.category === categoryFilter) &&
        (!startDate || new Date(t.date) >= startDate) &&
        (!endDate || new Date(t.date) <= endDate)
    )
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      return 0;
    });

  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  const handleEdit = (id) => alert(`Edit Transaction ID: ${id}`);
  const handleDelete = (id) => alert(`Delete Transaction ID: ${id}`);

  const handleExportCSV = () => {
    const csvRows = [
      ['Date', 'Category', 'Description', 'Amount'],
      ...filteredTransactions.map((tx) => [tx.date, tx.category, tx.description, tx.amount]),
    ];
    const csvContent = csvRows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  const renderCalendarTiles = ({ date }) => {
    const found = filteredTransactions.find((tx) => new Date(tx.date).toDateString() === date.toDateString());
    return found ? <div className="text-primary fw-bold">₹{found.amount}</div> : null;
  };

  return (
    <Container className="py-4">
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.08)',
        }}
      >
        <Card className="p-3 border border-info shadow-sm">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <h3 className="mb-3 mb-md-0">Transactions</h3>
            <div>
              <Button
                variant="outline-info"
                className="me-2 mb-2 mb-md-0"
                onClick={() => setCalendarView(!calendarView)}
              >
                {calendarView ? 'Table View' : 'Calendar View'}
              </Button>
              <Button variant="success" onClick={handleExportCSV}>
                Export CSV
              </Button>
            </div>
          </div>

          <Row className="mb-4 g-2">
            <Col xs={12} md={3}>
              <Form.Control
                placeholder="Search by description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col xs={12} md={2}>
              <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Groceries">Groceries</option>
                <option value="Utilities">Utilities</option>
                <option value="Transport">Transport</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={2}>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </Form.Select>
            </Col>
            <Col xs={12} sm={6} md={2}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                className="form-control"
              />
            </Col>
            <Col xs={12} sm={6} md={2}>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                className="form-control"
              />
            </Col>
          </Row>

          <h5>Total Amount: ₹{totalAmount}</h5>

          {calendarView ? (
            <div className="mt-4 d-flex justify-content-center">
              <Calendar tileContent={renderCalendarTiles} className="border rounded shadow-sm" />
            </div>
          ) : (
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td>{tx.category}</td>
                    <td>{tx.description}</td>
                    <td>{tx.amount}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(tx.id)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleDelete(tx.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </div>
    </Container>
  );
};

export default Transactions;
