import React from 'react';
import './DashboardOverview.scss';

const DashboardOverview = () => {
  return (
    <div className="recipient-dashboard-overview">
      <h1>Dashboard Overview</h1>

      <div className="stats-cards">
        <div className="card">
          <h3>Certificates Owned</h3>
          <p>5</p>
        </div>
        <div className="card">
          <h3>Verified Certificates</h3>
          <p>3</p>
        </div>
        <div className="card">
          <h3>Pending Verifications</h3>
          <p>2</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>✅ Verified "Blockchain Fundamentals" on May 25</li>
          <li>📄 Added "Intro to Smart Contracts" on May 18</li>
          <li>🕒 Verification pending for "Web3 Bootcamp Certificate"</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
