// src/pages/MyAccount.jsx
import React from "react";
import "../styles/MyAccount.css";
import {
  FaWallet,
  FaArrowUp,
  FaExchangeAlt,
  FaCog,
  FaBell,
  FaDollarSign,
  FaQuestionCircle,
  FaComments,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const navigate = useNavigate();

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const username = activeUser?.username || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    navigate("/login");
  };

  return (
    <div className="account-page">
      <header className="account-header">
        <div className="profile">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <h2>{username}</h2>
            <p>VIP1</p>
          </div>
        </div>
        <FaCog className="settings-icon" />
      </header>

      <section className="balance-card">
        <div className="balance-item1">
          <p>My Assets (USDT)</p>
          <h3>7,612,732.00</h3>
        </div>
        <div className="balance-item">
          <p>Deposit (USDT)</p>
          <h3>184,497.5</h3>
          <button className="refund-btn">Apply for Refund</button>
        </div>
      </section>

      <section className="actions">
        <div className="action-item">
          <FaWallet />
          <p>Deposit</p>
        </div>
        <div className="action-item">
          <FaExchangeAlt />
          <p>Withdraw</p>
        </div>
        <div className="action-item">
          <FaExchangeAlt />
          <p>Transfer</p>
        </div>
        <div className="action-item">
          <FaArrowUp />
          <p>Upgrade</p>
        </div>
      </section>

      <section className="menu">
        <div className="menu-item">
          <FaBell />
          <span>Message Notification</span>
        </div>
        <div className="menu-item">
          <FaDollarSign />
          <span>Quick Buy</span>
        </div>
        <div className="menu-item">
          <FaQuestionCircle />
          <span>Help Center</span>
        </div>
        <div className="menu-item">
          <FaComments />
          <span>Language Switch</span>
        </div>
      </section>

      <button className="switch-account" onClick={handleLogout}>
        Logout
      </button>

      <footer className="bottom-nav">
        <div className="nav-item">
          <FaHome />
          <p>Home</p>
        </div>
        <div className="nav-item">
          <FaExchangeAlt />
          <p>Trade</p>
        </div>
        <div className="nav-item">
          <FaArrowUp />
          <p>Transfer</p>
        </div>
        <div className="nav-item active">
          <FaUser />
          <p>My Account</p>
        </div>
      </footer>
    </div>
  );
}
