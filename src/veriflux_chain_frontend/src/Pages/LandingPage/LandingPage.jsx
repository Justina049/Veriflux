import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bgImage from "../../Images/pexels-rostislav-5011647.jpg";
import "./LandingPage.scss";


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
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

        <button className="cta-nav" onClick={() => navigate("/login")}>
          Go to App
        </button>
      </nav>

      {/* Hero Section */}
      <div className="hero-section"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="hero-content">
          <h1>Secure & Decentralized Certificate Verification</h1>
          <p>
            VeriFlux ensures authenticity and trust using blockchain technology.
          </p>

          <button className="get-started" onClick={() => navigate("/home")}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
