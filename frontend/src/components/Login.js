import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form action="/dashboard" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit" className="btn">Login</button>
      </form>
      <div className="link">
        <p>New User? <Link to="/register">Register Here</Link></p>
      </div>
    </div>
  );
};

export default Login;
