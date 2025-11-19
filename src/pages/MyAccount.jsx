// src/pages/MyAccount.jsx
import React, { useState, useEffect } from "react";
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

  const storedUser = JSON.parse(localStorage.getItem("activeUser")) || {};
  const username = storedUser?.username || "Guest";
  const initialMyAssets = storedUser.myAssetsUSDT || 7612732.0; // fallback to dashboard default

  const [myAssets, setMyAssets] = useState(initialMyAssets);
  const [depositBalance, setDepositBalance] = useState(storedUser.depositUSDT || 184497.5);

  // Sync myAssets to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "activeUser",
      JSON.stringify({
        ...storedUser,
        myAssetsUSDT: myAssets,
        depositUSDT: depositBalance,
      })
    );
  }, [myAssets, depositBalance]);

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    navigate("/login");
  };

  return (
    <div className="account-page">
      {/* ---------- HEADER ---------- */}
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

      {/* ---------- BALANCE CARD ---------- */}
      <section className="balance-card">
        <div className="balance-item1">
          <p>My Assets (USDT)</p>
          <h3>{myAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        </div>

        <div className="balance-item">
          <p>Deposit (USDT)</p>
          <h3>{depositBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <button className="refund-btn">Apply for Refund</button>
        </div>
      </section>

      {/* ---------- ACTION BUTTONS ---------- */}
      <section className="actions">
        <div className="action-item">
          <FaWallet />
          <p>Deposit</p>
        </div>

        <div className="action-item" onClick={() => navigate("/transfer")}>
          <FaExchangeAlt />
          <p>Withdraw</p>
        </div>

        <div className="action-item" onClick={() => navigate("/transfer")}>
          <FaArrowUp />
          <p>Transfer</p>
        </div>

        <div className="action-item">
          <FaArrowUp />
          <p>Upgrade</p>
        </div>
      </section>

      {/* ---------- MENU PANEL ---------- */}
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

      {/* ---------- LOGOUT ---------- */}
      <button className="switch-account" onClick={handleLogout}>
        Logout
      </button>

      {/* ---------- BOTTOM NAVIGATION ---------- */}
      <footer className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/")}>
          <FaHome />
          <p>Home</p>
        </div>

        <div className="nav-item" onClick={() => navigate("/")}>
          <FaExchangeAlt />
          <p>Trade</p>
        </div>

        <div className="nav-item" onClick={() => navigate("/transfer")}>
          <FaArrowUp />
          <p>Transfer</p>
        </div>

        <div className="nav-item active" onClick={() => navigate("/account")}>
          <FaUser />
          <p>My Account</p>
        </div>
      </footer>
    </div>
  );
}
