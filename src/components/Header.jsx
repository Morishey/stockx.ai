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

  // Handler to refresh page when Home clicked
  const handleHomeClick = (e) => {
    e.preventDefault(); // prevent default link behavior
    window.location.reload(); // force full reload
  };

  return (
    <header className="header">
      <a href="/" className="logo" onClick={handleHomeClick}>
        StockX<span>.ai</span>
      </a>

      <nav className="nav">
        {/* Home button refreshes page */}
        <a href="/" onClick={handleHomeClick}>
          Home
        </a>

        {/* Other links use react-router-dom's client-side routing */}
        <Link to="/markets">Markets</Link>gi
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/account">Account</Link>
      </nav>
    </header>
  );
}
