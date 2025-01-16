import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form action="/login" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" name="firstname" required />

        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit" className="btn">Register</button>
      </form>
      <div className="link">
        <p>Already have an account? <Link to="/login">Login Here</Link></p>
      </div>
    </div>
  );
};

export default Register;
