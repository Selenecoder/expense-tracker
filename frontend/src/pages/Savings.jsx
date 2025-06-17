import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ProgressBar,
} from "react-bootstrap";
import StockTicker from "../components/StockTicker";
import MarketIndexCards from "../components/MarketIndexCards";
import { Navigate } from "react-router-dom";

function Savings() {
  const [goals, setGoals] = useState([
    { name: "Emergency Fund", target: 20000, saved: 15000 },
    { name: "Vacation", target: 15000, saved: 8000 },
    { name: "Bike", target: 15000, saved: 10000 },
  ]);

  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");

  const handleAddGoal = () => {
    if (!goalName || !goalTarget) return;
    const newGoal = {
      name: goalName,
      target: parseInt(goalTarget),
      saved: 0,
    };
    setGoals([...goals, newGoal]);
    setGoalName("");
    setGoalTarget("");
  };

  const [selectedBank, setSelectedBank] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEmi] = useState(null);

  const bankRates = {
    SBI: 9.1,
    "HDFC Bank": 9.5,
    "ICICI Bank": 10.2,
    "Axis Bank": 9.75,
    "Kotak Mahindra": 10.0,
  };

  const calculateEMI = () => {
    if (loanAmount && interestRate && loanTenure) {
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 12 / 100;
      const n = parseFloat(loanTenure) * 12;

      const emiValue =
        (principal * rate * Math.pow(1 + rate, n)) /
        (Math.pow(1 + rate, n) - 1);
      setEmi(emiValue);
    } else {
      alert("Please fill in all fields.");
    }
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
        <h2>Savings Overview</h2>

        <Row className="mb-4">
          <Col>
            <Card className="p-3 shadow-sm border border-success">
              <Card.Body>
                <Card.Title className="text-dark">Total Savings</Card.Title>
                <Card.Text className="text-dark">₹50,000</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card className="p-3 shadow-sm border">
              <Card.Body>
                <Card.Title className="text-dark">Add Savings Goal</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Goal Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. New Car"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Target Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="e.g. ₹100000"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="success" onClick={handleAddGoal}>
                    Add Goal
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3 shadow-sm border">
              <Card.Body>
                <Card.Title className="text-dark">Existing Goals</Card.Title>
                {goals.map((goal, idx) => {
                  const progress = Math.min(
                    (goal.saved / goal.target) * 100,
                    100
                  );
                  return (
                    <div key={idx} className="mb-3">
                      <h6>{goal.name}</h6>
                      <ProgressBar
                        now={progress}
                        label={`${Math.floor(progress)}%`}
                        variant="success"
                      />
                      <small>
                        ₹{goal.saved} saved of ₹{goal.target}
                      </small>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card className="p-4 shadow-sm border border-primary">
              <Card.Body>
                <Card.Title className="text-dark">EMI Calculator</Card.Title>
                <Form>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Select Bank</Form.Label>
                        <Form.Select
                          value={selectedBank}
                          onChange={(e) => {
                            const selected = e.target.value;
                            setSelectedBank(selected);
                            setInterestRate(bankRates[selected]);
                          }}
                        >
                          <option value="">Choose a Bank</option>
                          {Object.keys(bankRates).map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Loan Amount</Form.Label>
                        <Form.Control
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          placeholder="₹"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Tenure (in years)</Form.Label>
                        <Form.Control
                          type="number"
                          value={loanTenure}
                          onChange={(e) => setLoanTenure(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Interest Rate (%)</Form.Label>
                        <Form.Control
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={8} className="d-flex align-items-end">
                      <Button variant="primary" onClick={calculateEMI}>
                        Calculate EMI
                      </Button>
                    </Col>
                  </Row>
                </Form>

                {emi && (
                  <div className="mt-3">
                    <h5>Estimated EMI: ₹{emi.toFixed(2)}</h5>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h4>Market Indices</h4>
            <MarketIndexCards />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h4>Live Stock Ticker</h4>
            <StockTicker />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Savings;
