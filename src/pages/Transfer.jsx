import React, { useState, useEffect } from "react";
import "../styles/Transfer.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Transfer() {
  const navigate = useNavigate();

  const activeUser = JSON.parse(localStorage.getItem("activeUser")) || {};
  const initialBalance = activeUser.myAssetsUSDT || 0;

  const [balance, setBalance] = useState(initialBalance);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transferFee, setTransferFee] = useState(0);
  const [feePaid, setFeePaid] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [showAddressError, setShowAddressError] = useState(false);

  // USDT wallet regex (ERC20, TRC20, Omni)
  const usdtRegex = /^T[a-zA-Z0-9]{33}$|^0x[a-fA-F0-9]{40}$|^1[a-zA-Z0-9]{25,34}$/;

  // Validate wallet address
  useEffect(() => {
    const valid = usdtRegex.test(address.trim());
    setIsAddressValid(valid);
    if (address.length > 0) {
      setShowAddressError(!valid);
    } else {
      setShowAddressError(false); // do not show error if empty initially
    }
  }, [address]);

  // Update transfer fee whenever amount changes
  useEffect(() => {
    const fee = amount > 0 ? +(0.25 * amount).toFixed(2) : 0;
    setTransferFee(fee);
  }, [amount]);

  const handlePayFee = () => {
    alert("Pay Transfer Fee clicked. (Functionality not implemented yet)");
  };

  const handleTransfer = () => {
    if (!feePaid) return alert("Please pay the transfer fee first.");
    if (!isAddressValid) return alert("Enter a valid USDT address.");
    if (amount <= 0) return alert("Enter a valid amount.");
    if (amount + transferFee > balance) return alert("Insufficient balance.");

    const newBalance = balance - amount - transferFee;
    setBalance(newBalance);

    localStorage.setItem(
      "activeUser",
      JSON.stringify({ ...activeUser, myAssetsUSDT: newBalance })
    );

    alert("Transfer successful!");
    navigate("/account");
  };

  return (
    <div className="transfer-page" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="transfer-container">
        {/* Header */}
        <header className="transfer-header">
          <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
          <h2>Transfer USDT</h2>
        </header>

        {/* Transfer Card */}
        <div className="transfer-card">
          {/* Available Balance */}
          <div className="info-row">
            <p>Available Balance:</p>
            <h3>{balance.toLocaleString()} USDT</h3>
          </div>

          {/* Recipient Address */}
          <div className="form-group">
            <label htmlFor="usdtAddress">Recipient USDT Address</label>
            <input
              id="usdtAddress"
              type="text"
              placeholder="Enter wallet address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                borderColor:
                  address.length === 0 ? "#ccc" : isAddressValid ? "green" : "red",
              }}
            />
            {showAddressError && (
              <small className="error-text">Enter valid USDT wallet</small>
            )}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* Transfer Fee (readonly) */}
          <div className="form-group">
            <label htmlFor="transferFee">Transfer Fee (25%)</label>
            <input
              id="transferFee"
              type="number"
              value={transferFee}
              readOnly
              placeholder="0.00"
              style={{
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed",
                color: "#888",
              }}
            />
          </div>

          {/* Fee Button */}
          <button
            className="fee-btn"
            onClick={handlePayFee}
            disabled={amount <= 0 || !isAddressValid}
            style={{
              cursor: amount <= 0 || !isAddressValid ? "not-allowed" : "pointer",
              opacity: amount <= 0 || !isAddressValid ? 0.6 : 1,
            }}
          >
            Pay Transfer Fee ({transferFee} USDT)
          </button>
          {transferFee > 0 && !feePaid && (
            <small style={{ color: "#555" }}>
              ({transferFee} USDT will be deducted)
            </small>
          )}

          {/* Confirm Transfer */}
          <button
            className="transfer-btn"
            onClick={handleTransfer}
            disabled={
              !feePaid || !isAddressValid || amount <= 0 || amount + transferFee > balance
            }
            style={{
              cursor:
                !feePaid || !isAddressValid || amount <= 0 || amount + transferFee > balance
                  ? "not-allowed"
                  : "pointer",
              opacity:
                !feePaid || !isAddressValid || amount <= 0 || amount + transferFee > balance
                  ? 0.6
                  : 1,
            }}
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
