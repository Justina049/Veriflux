import React from "react";
import { GrCertificate } from "react-icons/gr";
import { FaCheckCircle, FaExclamationTriangle, FaDatabase } from "react-icons/fa";
import "./Features.scss";

const Features = () => {
  return (
    <section id="features" className="key-features-section">
      <h2 className="key-features-title">Key Features of VeriFlux Chain</h2>
      <p className="key-features-description">
        VeriFlux Chain allows you to mint and verify certificates securely with a seamless and efficient process.
      </p>

      <div className="features-grid">
        <div className="feature-item">
          <GrCertificate className="feature-icon" />
          <h3>Mint Certificates</h3>
          <p>Issue tamper-proof certificates with a unique cryptographic hash, ensuring authenticity.</p>
        </div>

        <div className="feature-item">
          <FaCheckCircle className="feature-icon green" />
          <h3>Instant Verification</h3>
          <p>Verify certificate authenticity instantly on the blockchain with real-time validation.</p>
        </div>

        <div className="feature-item">
          <FaExclamationTriangle className="feature-icon red" />
          <h3>Fraud Prevention</h3>
          <p>Eliminate fake credentials by ensuring all issued certificates are immutable and verifiable.</p>
        </div>

        <div className="feature-item">
          <FaDatabase className="feature-icon orange" />
          <h3>Transparent Recordkeeping</h3>
          <p>Maintain a decentralized, tamper-proof certificate registry accessible to institutions and verifiers.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
