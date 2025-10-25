// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
import Home from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";
import SuccessTransition from "./pages/SuccessTransition";

// Components
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
  const [loadingAction, setLoadingAction] = useState(""); // ✅ track login/logout type
  const location = useLocation();
  const navigate = useNavigate();

  // Restore login state
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") setIsLoggedIn(true);
  }, []);

  // Save login state
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  /* ---------- LOGIN ---------- */
  const handleLogin = () => {
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

  /* ---------- DISABLE SCROLL ON AUTH PAGES ---------- */
  useEffect(() => {
    const noScrollPages = ["/", "/login", "/register", "/auth", "/success"];
    if (noScrollPages.includes(location.pathname)) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [location.pathname]);

  /* ---------- SHOW LOADING SCREEN ---------- */
  if (isLoading) {
    let message = "Please wait...";
    if (loadingAction === "login") message = "Preparing your dashboard...";
    if (loadingAction === "logout") message = "Exiting dashboard...";
    return <LoadingScreen message={message} />;
  }

  /* ---------- ROUTES ---------- */
  return (
    <>
      {/* ✅ Hide Header on non-dashboard pages */}
      {!["/", "/login", "/register", "/auth", "/success"].includes(
        location.pathname
      ) && <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}

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

          {/* ✅ Success Transition Route */}
          <Route
            path="/success"
            element={
              <PageWrapper>
                <SuccessTransition />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

/* ---------- MAIN APP WRAPPER ---------- */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
