// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth"); // Takes user to the Login/Register choice page
  };

  return (
    <main className="hero">
      <div className="hero-content">
        <h2>
          Welcome to <span>StockX.ai</span>
        </h2>
        <p>Track, trade, and grow your wealth with AI-driven insights.</p>
        <button className="glow-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </main>
  );
}
