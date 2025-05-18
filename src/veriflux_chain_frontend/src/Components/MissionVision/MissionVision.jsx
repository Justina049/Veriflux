import React from "react";
import "./MissionVision.scss";

const MissionVision = () => {
  return (
    <section className="mission-vision-section">
      <div className="mission-vision-container">
        <h2 className="mission-vision-title">About VeriFlux Chain</h2>
        <p className="mission-vision-description">
          VeriFlux Chain is a decentralized certificate verification system designed 
          to eliminate fraud, enhance trust, and streamline authentication processes 
          using cutting-edge blockchain technology.
        </p>

        <div className="mission-vision-cards">
          <div className="card">
            <h3>Our Mission</h3>
            <p>
              To provide a secure and verifiable solution for institutions, 
              employers, and individuals to validate credentials with confidence.
            </p>
          </div>

          <div className="card">
            <h3>Our Vision</h3>
            <p>
              We envision a future where academic and professional achievements are 
              authenticated seamlessly, reducing fraudulent claims and increasing transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
