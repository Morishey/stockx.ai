import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Modal.css";

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="modal-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal box */}
          <motion.div
            className="modal-content"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <h2>{title}</h2>
            <p>{message}</p>

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={onClose}>
                {cancelText}
              </button>
              <button className="confirm-btn" onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
