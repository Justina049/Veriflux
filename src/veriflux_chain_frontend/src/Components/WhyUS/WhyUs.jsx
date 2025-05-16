import React from 'react';
import { MdOutlineSecurity } from 'react-icons/md';
import { FaGlobe, FaClock, FaExpand } from 'react-icons/fa';
import './WhyUs.scss'; 

const WhyUs = () => {
  return (
    <section id="benefits" className="why-veriflux-section">
      <h2 className="why-veriflux-title">Why Choose VeriFlux Chain?</h2>
      <p className="why-veriflux-description">
        VeriFlux Chain revolutionizes certificate verification through a secure, decentralized, and fraud-resistant platform.
      </p>

      <div className="why-veriflux-container">
        {/* Advanced Security */}
        <div className="why-veriflux-card">
          <MdOutlineSecurity className="feature-icon" size={40} />
          <h3>Advanced Security</h3>
          <p>Leverages cryptographic hashing and decentralized protocols to prevent forgery and unauthorized changes.</p>
          <p>Ensures document integrity through secure uploads and automatic authenticity checks.</p>
        </div>

        {/* Global Accessibility */}
        <div className="why-veriflux-card">
          <FaGlobe className="feature-icon" size={40} />
          <h3>Global Accessibility</h3>
          <p>Access and verify certificates anytime, anywhere with real-time online tracking and submission visibility.</p>
        </div>

        {/* Immutable Records */}
        <div className="why-veriflux-card">
          <FaClock className="feature-icon" size={40} />
          <h3>Immutable Records</h3>
          <p>Records are permanently stored on a tamper-proof ledger, ensuring trust and transparency for all stakeholders.</p>
        </div>

        {/* Decentralized & Scalable */}
        <div className="why-veriflux-card">
          <FaExpand className="feature-icon" size={40} />
          <h3>Decentralized & Scalable</h3>
          <p>Powered by the Internet Computer (ICP) for high performance, reliability, and seamless scalability.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
