// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    const loginRestricted = localStorage.getItem("loginRestricted") === "true";

    if (loginRestricted) {
      setError("🚫 Login temporarily disabled by admin.");
      return;
    }

    if (!matchedUser) {
      setError("❌ Login invalid. Try again.");
      return;
    }

    if (matchedUser.isBlocked) {
      setError("🚷 Your account has been blocked by admin.");
      return;
    }

    // ✅ Successful login
    setError("");
    onLogin();
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
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* ✅ Error message appears below password */}
          {error && <p className="error-message">{error}</p>}

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
