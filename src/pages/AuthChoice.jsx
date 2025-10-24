import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthChoice.css";

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="auth-choice-page">
      {/* ===== LOGO HEADER ===== */}
      <Link to="/" className="auth-logo">
        StockX<span>.ai</span>
      </Link>

      {/* ===== AUTH CARD ===== */}
      <div className="auth-card">
        <h1>Welcome</h1>
        <p>Your AI-powered trading companion.</p>

        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="register-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
