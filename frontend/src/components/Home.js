import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">SRH🪙💵</div>
        <button className="login-button">Login</button>
      </header>

      <section className="intro-section">
        <h1>Your Financial Management Hub</h1>
        <p>Track your finances and convert currencies easily. Get started now!</p>
        <Link to="/financial-management">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>

      <div className="features-container">
        <div className="feature-box">
          <h3>Currency Exchange</h3>
          <p>Convert currencies with real-time exchange rates. Accurate, fast, and secure exchange at your fingertips.</p>
          <Link to="/exchangerates">
          <button className="feature-button">Explore Exchange Rates</button>
          </Link>
        </div>
        <div className="feature-box">
          <h3>Financial Management</h3>
          <p>Track your income, expenses, savings, and create budgets to stay on top of your finances.</p>
          <Link to="/financial-management">
            <button className="feature-button">Start Managing</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
