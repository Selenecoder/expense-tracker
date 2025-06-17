// src/App.jsx
import { Route, Routes } from 'react-router-dom';
import AppNavbar from "./components/AppNavbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Transactions from './pages/Transactions';  
import Savings from "./pages/Savings";
import Statistics from './pages/Statistics';
import Reports from './pages/Reports';
import Cards from './pages/Cards';
import Settings from './pages/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div className="app-container">
      
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <Dashboard />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>

        <Route path="/add-expense" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <AddExpense />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>

        <Route path="/transactions" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <Transactions />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/savings" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <Savings />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/statistics" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <Statistics />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/reports" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <Reports />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/cards" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <Cards />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/settings" element={
          <ProtectedRoute>
            <div className="dashboard-layout">
              <AppNavbar />
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <Settings />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
