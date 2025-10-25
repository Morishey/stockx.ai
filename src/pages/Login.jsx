// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("activeUser", JSON.stringify(foundUser));
      onLogin();
    } else {
      alert("Invalid credentials or user not found.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        {/* ✅ Clickable link styled without underline */}
        <p className="auth-footer-text">
          Don’t have an account?{" "}
          <button
            type="button"
            className="auth-link-btn"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}
