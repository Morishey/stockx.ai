// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

// Pages
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthChoice from "./pages/AuthChoice";

/* ---------- PAGE TRANSITION WRAPPER ---------- */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- HOME PAGE ---------- */
function Home() {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate("/auth");

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

/* ---------- HEADER COMPONENT ---------- */
function Header({ isLoggedIn, handleLogout }) {
  const location = useLocation();

  // Hide header on Home, Login, Register, and AuthChoice pages
  const hideHeader = ["/", "/login", "/register", "/auth"].includes(
    location.pathname
  );

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

/* ---------- APP BODY (INSIDE ROUTER) ---------- */
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // load login state
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") setIsLoggedIn(true);
  }, []);

  // persist login state
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  // Disable scrolling on specific pages
  useEffect(() => {
    const noScrollPages = ["/", "/login", "/register", "/auth"];
    if (noScrollPages.includes(location.pathname)) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [location.pathname]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/auth"
            element={
              <PageWrapper>
                <AuthChoice />
              </PageWrapper>
            }
          />
          <Route
            path="/account"
            element={
              <PageWrapper>
                <MyAccount />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login onLogin={handleLogin} />
              </PageWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

/* ---------- WRAP EVERYTHING IN ROUTER ---------- */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
