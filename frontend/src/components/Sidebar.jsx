import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";  // No need for Router here
import { FaTachometerAlt, FaPlusCircle, FaCreditCard, FaChartBar, FaFileAlt, FaCog, FaExchangeAlt, FaChartPie, FaPiggyBank } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ username }) => {
  return (
    <div className="sidebar-container d-flex flex-column justify-content-between">
      <Nav className="flex-column p-3">
        <Nav.Link as={Link} to="/dashboard" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaTachometerAlt /></div> Dashboard
        </Nav.Link>

        <Nav.Link as={Link} to="/add-expense" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaPlusCircle /></div> Add Expense
        </Nav.Link>
       
        <Nav.Link as={Link} to="/cards" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaCreditCard /></div> Cards
        </Nav.Link>

        <Nav.Link as={Link} to="/transactions" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaExchangeAlt /></div> Transactions
        </Nav.Link>

        <Nav.Link as={Link} to="/reports" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaFileAlt /></div> Reports
        </Nav.Link>

        <Nav.Link as={Link} to="/statistics" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaChartPie /></div> Statistics
        </Nav.Link>

        <Nav.Link as={Link} to="/savings" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaPiggyBank /></div> Savings
        </Nav.Link>

        <Nav.Link as={Link} to="/settings" className="text-white d-flex align-items-center">
          <div className="icon-box"><FaCog /></div> Settings
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
