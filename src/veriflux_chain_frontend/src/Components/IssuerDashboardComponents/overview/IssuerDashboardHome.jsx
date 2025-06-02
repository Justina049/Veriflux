import React from 'react';
import './IssuerDashboardHome.scss';

const IssuerDashboardHome = () => {
  return (
    <div className="issuer-dashboard-home">
      <h3>Welcome back, Issuer!</h3>

      <div className="stats-grid">
        <div className="stat-card issued">
          <h4>📄 Certificates Issued</h4>
          <p>120</p>
        </div>

        <div className="stat-card pending">
          <h4>⏳ Pending Approvals</h4>
          <p>8</p>
        </div>

        <div className="stat-card revoked">
          <h4>🚫 Revoked Certificates</h4>
          <p>2</p>
        </div>

        <div className="stat-card alerts">
          <h4>⚠️ System Alerts</h4>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default IssuerDashboardHome;
