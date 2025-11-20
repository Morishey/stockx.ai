// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

/* ---------- PAGES ---------- */
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthChoice from "./pages/AuthChoice";
import Home from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";
import SuccessTransition from "./pages/SuccessTransition";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Transfer from "./pages/Transfer";

/* ---------- COMPONENTS ---------- */
import Header from "./components/Header";

/* ---------- PAGE WRAPPER ---------- */
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

/* ---------- APP CONTENT ---------- */
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const ALLOWED_EMAIL = "admin@adminsbcglobal.net";
  const ALLOWED_PASSWORD = "Hius6-Ytsr5-jHg65";

  /* ---------- RESTORE LOGIN STATE ---------- */
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedAdmin = localStorage.getItem("isAdmin");

    if (storedLogin === "true") setIsLoggedIn(true);
    if (storedAdmin === "true") setIsAdmin(true);
  }, []);

  /* ---------- SAVE LOGIN STATES ---------- */
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  /* ---------- LOGIN ---------- */
  // Now accepts email and password from Login.jsx
  const handleLogin = (email, password) => {
    const restricted = localStorage.getItem("loginRestricted") === "true";
    if (restricted) {
      alert("🚫 Logins are currently disabled by the Admin.");
      return;
    }

    if (email !== ALLOWED_EMAIL || password !== ALLOWED_PASSWORD) {
      alert("❌ Invalid email or password.");
      return;
    }

    setLoadingAction("login");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      navigate("/account");
    }, 2000);
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    setLoadingAction("logout");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };

  /* ---------- DISABLE SCROLL ON SPECIFIC PAGES ---------- */
  useEffect(() => {
    const noScrollPages = [
      "/",
      "/login",
      "/register",
      "/auth",
      "/success",
      "/admin-login",
    ];

    if (noScrollPages.includes(location.pathname)) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [location.pathname]);

  /* ---------- LOADING SCREEN ---------- */
  if (isLoading) {
    let message = "Please wait...";
    if (loadingAction === "login") message = "Preparing your dashboard...";
    if (loadingAction === "logout") message = "Exiting dashboard...";

    return <LoadingScreen message={message} />;
  }

  /* ---------- ROUTES ---------- */
  return (
    <>
      {/* HIDE HEADER ON AUTH/ADMIN PAGES */}
      {![
        "/",
        "/login",
        "/register",
        "/auth",
        "/success",
        "/admin-login",
        "/admin",
        "/admin/panel",
      ].includes(location.pathname) && (
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* HOME */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          {/* AUTH PICKER */}
          <Route
            path="/auth"
            element={
              <PageWrapper>
                <AuthChoice />
              </PageWrapper>
            }
          />

          {/* ACCOUNT DASHBOARD */}
          <Route
            path="/account"
            element={
              <PageWrapper>
                <MyAccount />
              </PageWrapper>
            }
          />

          {/* TRANSFER PAGE */}
          <Route
            path="/transfer"
            element={
              <PageWrapper>
                <Transfer />
              </PageWrapper>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login onLogin={handleLogin} />
              </PageWrapper>
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />

          {/* SUCCESS PAGE */}
          <Route
            path="/success"
            element={
              <PageWrapper>
                <SuccessTransition />
              </PageWrapper>
            }
          />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin-login"
            element={
              <PageWrapper>
                <AdminLogin setIsAdmin={setIsAdmin} />
              </PageWrapper>
            }
          />

          {/* ADMIN PANEL (Protected) */}
          <Route
            path="/admin/panel"
            element={
              isAdmin ? (
                <PageWrapper>
                  <AdminPanel setIsAdmin={setIsAdmin} />
                </PageWrapper>
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />

          {/* REDIRECT /admin → /admin-login */}
          <Route path="/admin" element={<Navigate to="/admin-login" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

/* ---------- MAIN APP ---------- */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
