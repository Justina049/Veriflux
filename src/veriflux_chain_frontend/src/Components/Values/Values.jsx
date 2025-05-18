import React from 'react';
import { FaLock, FaUserCheck, FaLayerGroup, FaRocket } from 'react-icons/fa';
import './Values.scss'

const values = [
  {
    icon: <FaLock />,
    title: 'Security',
    description: 'We prioritize data integrity, ensuring credentials are tamper-proof and verifiable on the blockchain.',
  },
  {
    icon: <FaUserCheck />,
    title: 'Trust & Transparency',
    description: 'Every credential issued can be independently verified to establish trust between all parties.',
  },
  {
    icon: <FaLayerGroup />,
    title: 'Interoperability',
    description: 'Our solution integrates seamlessly with existing systems and supports multiple institutions.',
  },
  {
    icon: <FaRocket />,
    title: 'Innovation',
    description: 'We leverage modern blockchain technology to bring scalable and forward-thinking solutions.',
  },
];

const Values = () => {
  return (
    <section className="values-section">
  <div className="values-container">
    <h2 className="values-title">Our Core Values</h2>
    <div className="values-grid">
      <div className="value-item">
        <div className="icon">💡</div>
        <h4>Innovation</h4>
        <p>We constantly seek creative solutions to drive progress.</p>
      </div>
      <div className="value-item">
        <div className="icon">🤝</div>
        <h4>Integrity</h4>
        <p>Honesty and transparency guide all our actions.</p>
      </div>
   
    </div>
  </div>
</section>

  );
};

export default Values;
