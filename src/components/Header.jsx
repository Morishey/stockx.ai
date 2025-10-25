import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Hide nav bar completely on some pages (optional)
  const hideHeader = [
    "/",
    "/login",
    "/register",
    "/auth",
    "/success",
    "/admin-login",
    "/admin",
  ].includes(location.pathname);

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
      </nav>
    </header>
  );
}
