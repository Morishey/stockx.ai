// src/components/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

export default function Header({ isLoggedIn, handleLogout }) {
  const location = useLocation();
  const hideHeader = ["/login", "/register", "/auth"].includes(location.pathname);

  if (hideHeader) return null;

  return (
    <header className="header">
      <Link to="/" className="logo">
        StockX<span>.ai</span>
      </Link>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/markets">Markets</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/account">Account</Link>

        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
