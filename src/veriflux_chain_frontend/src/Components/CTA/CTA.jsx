import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CTA.scss';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <h2>Ready to Take Control of Certificate Verification?</h2>
      <p>
        Start issuing and verifying certificates on the blockchain with ease and transparency.
      </p>
      <div className="cta-buttons">
        <button className="btn primary" onClick={() => navigate('/signup')}>
          Get Started
        </button>
        <button className="btn secondary" onClick={() => navigate('/contact')}>
          Talk to Us
        </button>
      </div>
    </section>
  );
};

export default CTA;
