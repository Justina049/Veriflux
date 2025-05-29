import React from 'react';
import './IssuerSidebar.scss';

const IssuerSidebar = () => {
  return (
    <div className="issuer-sidebar">
      <div className="logo">VeriFlux</div>

      <ul className="nav-links">
        <li><a href="#">🏠 Dashboard</a></li>
        <li><a href="#">📝 Issue Certificate</a></li>
        <li><a href="#">📄 Certificate Records</a></li>
        <li><a href="#">📊 Analytics</a></li>
        <li><a href="#">🔔 Notifications</a></li>
        <li><a href="#">❓ Help</a></li>
        <li><a href="#">👤 Profile</a></li>
        <li><a href="#">🚪 Logout</a></li>
      </ul>
    </div>
  );
};

export default IssuerSidebar;
