import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/SuccessTransition.css";

export default function SuccessTransition() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-transition">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="success-content"
      >
        <motion.div
          className="success-check"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
        >
          ✅
        </motion.div>

        <motion.h2
          className="success-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Successful!
        </motion.h2>

        <motion.p
          className="redirect-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          Account created. Redirecting to Sign In...
        </motion.p>
      </motion.div>
    </div>
  );
}
