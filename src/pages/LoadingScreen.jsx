import React from "react";
import { motion } from "framer-motion";
import "../styles/LoadingScreen.css";

export default function LoadingScreen({ message = "Please wait..." }) {
  return (
    <div className="loading-screen">
      <motion.div
        className="loading-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated spinner */}
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          ⚙️
        </motion.div>

        {/* Loading message */}
        <motion.h2
          className="loading-text"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {message}
        </motion.h2>

        {/* Subtext pulse */}
        <motion.p
          className="loading-subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          StockX.ai is preparing your dashboard...
        </motion.p>
      </motion.div>
    </div>
  );
}
