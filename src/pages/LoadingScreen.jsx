// src/pages/LoadingScreen.jsx
import React from "react";
import { motion } from "framer-motion";
import "../styles/LoadingScreen.css";

export default function LoadingScreen({ message, action }) {
  const subText =
    action === "login"
      ? "Preparing your personalized dashboard..."
      : action === "logout"
      ? "Safely logging you out..."
      : "Please wait...";

  return (
    <motion.div
      className="loading-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="loading-container">
        <div className="spinner"></div>
        <h2 style={{ marginTop: "1rem", color: "#00ff9d" }}>{message}</h2>
        <p style={{ marginTop: "0.5rem", color: "#aaa" }}>{subText}</p>
      </div>
    </motion.div>
  );
}
