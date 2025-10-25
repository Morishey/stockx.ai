// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import "../styles/AdminPanel.css";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const blocked = JSON.parse(localStorage.getItem("blockedUsers")) || [];
    setUsers(storedUsers);
    setBlockedUsers(blocked);
  }, []);

  const toggleBlockUser = (email) => {
    const updatedBlocked = blockedUsers.includes(email)
      ? blockedUsers.filter((u) => u !== email)
      : [...blockedUsers, email];

    setBlockedUsers(updatedBlocked);
    localStorage.setItem("blockedUsers", JSON.stringify(updatedBlocked));
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h2>👑 Admin Dashboard</h2>
          <button className="logout-admin-btn" onClick={handleAdminLogout}>
            Logout
          </button>
        </div>

        <div className="admin-section">
          <h3>Registered Users</h3>
          {users.length === 0 ? (
            <p className="empty-msg">No users registered yet.</p>
          ) : (
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const isBlocked = blockedUsers.includes(user.email);
                    return (
                      <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`status ${
                              isBlocked ? "blocked" : "active"
                            }`}
                          >
                            {isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`admin-action-btn ${
                              isBlocked ? "unblock" : "block"
                            }`}
                            onClick={() => toggleBlockUser(user.email)}
                          >
                            {isBlocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
