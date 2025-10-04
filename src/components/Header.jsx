import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { user, logout, login } = useAuth();

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        StudySpot PH
      </NavLink>
      <nav>
        {user ? (
          <>
            <NavLink to="/dashboard/my-bookings">My Dashboard</NavLink>
            <span>Welcome, {user.name}!</span>
            <button onClick={logout} className="auth-btn">
              Logout
            </button>
          </>
        ) : (
          <button onClick={login} className="auth-btn">
            Login as Juan
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
