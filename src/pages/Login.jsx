// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Login({ onLogin, errorMessage, clearError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Optional: clear error when user changes input
  useEffect(() => {
    if (errorMessage) {
      clearError();
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Show error message passed from App.js */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer-text">
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link-btn">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
