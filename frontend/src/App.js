import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FinancialManagementSystem from './components/FinancialManagementSystem';
import Login from './components/Login';
import Register from './components/Register';
import CurrencyConverter from './components/CurrencyConverter';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/financial-management" element={<FinancialManagementSystem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="exchangerates" element={<CurrencyConverter/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/>
      </Routes>
    </Router>
  );
}

export default App;
