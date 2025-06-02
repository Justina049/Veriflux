import React from 'react';
import './Topbar.scss';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="page-title">Verifier Dashboard</div>
      <div className="user-profile">
        <span>Welcome, Verifier</span>
      </div>
    </div>
  );
};

export default Topbar;
