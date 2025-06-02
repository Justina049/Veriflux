import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Verifier</h2>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/verify">Search & Verify</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/logs">Verification Logs</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
