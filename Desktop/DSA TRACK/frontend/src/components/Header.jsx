import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/dashboard" className="logo">
          🧠 DSA Tracker
        </Link>

        <nav className="nav-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/all-problems">All Problems</Link>
          <Link to="/add-problem" className="btn btn-primary btn-small">
            + Add Problem
          </Link>
        </nav>

        <div className="user-menu">
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-email text-sm">{user?.email}</span>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setShowMenu(!showMenu)}
            title="Menu"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="dropdown-menu">
              <button className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
