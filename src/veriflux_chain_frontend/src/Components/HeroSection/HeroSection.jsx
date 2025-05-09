import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.scss";
// import Particles from "../Particles";
// import Particles from "../Particles";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      {/* Background Particles */}
      <div className="particles-bg">
        {/* <Particles /> */}
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>Secure & Decentralized Certificate Verification</h1>
        <p>VeriFlux ensures authenticity with blockchain security.</p>

        {/* Call-to-Action Buttons */}
        <div className="cta-buttons">
        <button className="get-started" onClick={() => navigate('/home')}>Get Started</button>
        <button className="go-to-app" onClick={() => navigate('/login')}>Go to App</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

     
