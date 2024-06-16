import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCy9Euznjdv8NQZtrgGtfFyD87INqx6IsqVQ&s" alt="Logo" />
        </div>
        <button className="admin-view-button">ADMIN VIEW</button>
      </div>
      <div className="nav-right">
        <button className="support-button">Support</button>
        <div className="profile">
          <div className="profile-icon">
            <img className="profile-icon" src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="profile" />
          </div>
          <span className="profile-name">Jane</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
