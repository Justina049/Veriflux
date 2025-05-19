import React from 'react';
import { FaLightbulb, FaHandshake, FaLock, FaGlobe } from 'react-icons/fa';
import './Values.scss';

const Values = () => {
  return (
    <section className="values-section">
      <div className="values-container">
        <h2 className="values-title">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="icon"><FaLightbulb /></div>
            <h4>Innovation</h4>
            <p>We constantly seek creative solutions to drive progress.</p>
          </div>
          <div className="value-item">
            <div className="icon"><FaHandshake /></div>
            <h4>Integrity</h4>
            <p>Honesty and transparency guide all our actions.</p>
          </div>
          <div className="value-item">
            <div className="icon"><FaLock /></div>
            <h4>Security</h4>
            <p>Your data and credentials are protected with industry-leading blockchain technology.</p>
          </div>
          <div className="value-item">
            <div className="icon"><FaGlobe /></div>
            <h4>Transparency</h4>
            <p>Our processes are open and verifiable to build trust across all users and institutions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
