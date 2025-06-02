import React from "react";
import "./Help.scss";

const Help = () => {
  return (
    <div className="help-container">
      <h2 className="help-title">Help & Support</h2>

      <section className="help-section">
        <h3 className="section-heading">Getting Started</h3>
        <p>
          VeriFlux Chain is a decentralized system that allows institutions to
          issue and verify digital certificates. You can register as an issuer
          or verifier, and use Internet Identity to securely access the
          platform.
        </p>
      </section>

      <section className="help-section">
        <h3 className="section-heading">For Issuers</h3>
        <ul className="section-list">
          <li>Login using Internet Identity.</li>
          <li>Navigate to the Issuer Dashboard.</li>
          <li>Fill in your profile with organization details.</li>
          <li>Mint and issue digital certificates to recipients.</li>
        </ul>
      </section>

      <section className="help-section">
        <h3 className="section-heading">For Verifiers</h3>
        <ul className="section-list">
          <li>Login using Internet Identity or access as a guest.</li>
          <li>Navigate to the Verify Certificate page.</li>
          <li>Input or upload a certificate ID/hash for verification.</li>
        </ul>
      </section>

      <section className="help-section">
        <h3 className="section-heading">Common Issues</h3>
        <ul className="section-list">
          <li>Ensure you have a stable internet connection.</li>
          <li>Internet Identity login not working? Try refreshing your browser.</li>
          <li>If certificate verification fails, confirm the hash or ID is correct.</li>
        </ul>
      </section>

      <section className="help-section">
        <h3 className="section-heading">Need Help?</h3>
        <p>
          For support or feedback, please contact the VeriFlux Chain team at{" "}
          <a href="mailto:support@veriflux.app" className="support-link">
            support@veriflux.app
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Help;
