// src/pages/Register.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    // ✅ Save new user
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("User already exists. Please login instead.");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    // ✅ Redirect to success transition
    navigate("/success", {
      state: { message: "✅ Successful! Account created — Sign in to continue." },
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        {/* ✅ Clickable "Login" link styled without underline */}
        <p className="auth-footer-text">
          Already have an account?{" "}
          <button
            type="button"
            className="auth-link-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
