// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MyAccount from "./pages/MyAccount";

function Home() {
  return (
    <main className="hero">
      <div className="hero-content">
        <h2>
          Welcome to <span>StockX.ai</span>
        </h2>
        <p>Track, trade, and grow your wealth with AI-driven insights.</p>
        <button className="glow-btn">Get Started</button>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app">
        {/* -------- Header (Visible on ALL pages) -------- */}
        <header className="header">
          <Link to="/" className="logo">
            StockX<span>.ai</span>
          </Link>

          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/markets">Markets</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/account">Account</Link>
          </nav>
        </header>

        {/* -------- Page Content -------- */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<MyAccount />} />
          {/* You can add more pages here later */}
        </Routes>
      </div>
    </Router>
  );
}
