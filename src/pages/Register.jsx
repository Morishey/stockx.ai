// src/pages/Register.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p className="subtitle">Join StockX<span>.ai</span> today</p>

        <form className="auth-form">
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="glow-btn">Register</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
