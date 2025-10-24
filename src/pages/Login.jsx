// src/pages/Login.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated login success
    onLogin();
    navigate("/account"); // Redirect to MyAccount
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">
          Log in to your StockX<span>.ai</span> account
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="glow-btn">Login</button>
        </form>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
