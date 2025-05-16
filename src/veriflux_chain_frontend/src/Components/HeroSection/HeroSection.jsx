// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./HeroSection.scss";
// // import Particles from "../Particles";
// // import Particles from "../Particles";

// const HeroSection = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="hero-section">
//       {/* Background Particles */}
//       <div className="particles-bg">
//         {/* <Particles /> */}
//       </div>

//       {/* Hero Content */}
//       <div className="hero-content">
//         <h1>Secure & Decentralized Certificate Verification</h1>
//         <p>VeriFlux ensures authenticity with blockchain security.</p>

//         {/* Call-to-Action Buttons */}
//         <div className="cta-buttons">
//         <button className="get-started" onClick={() => navigate('/home')}>Get Started</button>
//         <button className="go-to-app" onClick={() => navigate('/login')}>Go to App</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

     


import React from "react";
import { FaCheckCircle, FaGlobe, FaLock } from "react-icons/fa";
import "./HeroSection.scss";
import imng from "../../Images/mahila.png"

const HeroSection = () => {
 
  return (
    <section id="home-section" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-left">
            <div className="badge">
              <FaCheckCircle className="badge-icon" />
              <p className="badge-text">Blockchain-Verified Security</p>
            </div>

            <h1 className="hero-title">
              Authenticate & Verify Certificates <span>Seamlessly</span>
            </h1>
            <p className="hero-subtitle">
              A decentralized solution ensuring trust, security, and transparency
              in certificate verification.
            </p>

            <div className="hero-actions">
              <button className="hero-button primary">Get Started</button>
              <button className="hero-button secondary">Learn More</button>
            </div>

            <div className="features">
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" color="green" size={20} />
                <p className="feature-label">100% Tamper-Proof</p>
              </div>
              <div className="feature-item">
                <FaGlobe className="feature-icon" color="green" size={20} />
                <p className="feature-label">Global Verification</p>
              </div>
              <div className="feature-item">
                <FaLock className="feature-icon" color="green" size={20} />
                <p className="feature-label">Secure & Private</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-right">
            <img src={imng} alt="Secure Certificate Verification" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
