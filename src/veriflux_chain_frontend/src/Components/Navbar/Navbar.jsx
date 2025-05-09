import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">VeriFlux</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/issue" className={({ isActive }) => (isActive ? "active" : "")}>
            Issue Certificate
          </NavLink>
        </li>
        <li>
          <NavLink to="/verify" className={({ isActive }) => (isActive ? "active" : "")}>
            Verify Certificate
          </NavLink>
        </li>
        <li>
          <NavLink to="/list-certificate" className={({ isActive }) => (isActive ? "active" : "")}>
            List Certificates
          </NavLink>
        </li>
      </ul>
      <button className="go-to-app">Go to App</button>
    </nav>
  );
};

export default Navbar;
