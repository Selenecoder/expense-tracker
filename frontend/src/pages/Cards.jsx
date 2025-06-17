import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FaCcVisa, FaCcMastercard, FaCreditCard } from 'react-icons/fa';
import { BsCreditCard2FrontFill } from 'react-icons/bs';

const Cards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      holder: 'John Doe',
      number: '**** **** **** 1234',
      expiry: '12/26',
      type: 'Visa',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({ holder: '', number: '', expiry: '', type: '' });

  const handleAddCard = () => {
    setCards([
      ...cards,
      {
        ...newCard,
        id: cards.length + 1,
        number: '**** **** **** ' + newCard.number.slice(-4),
      },
    ]);
    setShowModal(false);
    setNewCard({ holder: '', number: '', expiry: '', type: '' });
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const getCardIcon = (type) => {
    if (type === 'Visa') return <FaCcVisa size={36} color="#fff" />;
    if (type === 'MasterCard') return <FaCcMastercard size={36} color="#fff" />;
    return <FaCreditCard size={36} color="#fff" />;
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>My Cards</h3>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add New Card
          </Button>
        </div>

        <Row>
          {cards.map((card) => (
            <Col md={4} key={card.id} className="mb-4">
              <div
                style={{
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #4b6cb7, #182848)',
                  color: '#fff',
                  padding: '1.5rem',
                  position: 'relative',
                  height: '200px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                }}
              >
                <div className="d-flex justify-content-between">
                  <BsCreditCard2FrontFill size={24} />
                  {getCardIcon(card.type)}
                </div>
                <div className="mt-4">
                  <h5 style={{ letterSpacing: '2px' }}>{card.number}</h5>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <small>Card Holder</small>
                    <div>{card.holder}</div>
                  </div>
                  <div>
                    <small>Expires</small>
                    <div>{card.expiry}</div>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Add Card Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Holder</Form.Label>
              <Form.Control
                type="text"
                value={newCard.holder}
                onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                maxLength={16}
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date (MM/YY)</Form.Label>
              <Form.Control
                type="text"
                value={newCard.expiry}
                onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Card Type</Form.Label>
              <Form.Select
                value={newCard.type}
                onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="RuPay">RuPay</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddCard}>
            Add Card
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cards;
