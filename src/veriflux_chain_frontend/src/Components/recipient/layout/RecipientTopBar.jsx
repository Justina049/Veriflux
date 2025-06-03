import React from 'react';
import './RecipientTopBar.scss';

const RecipientTopBar = () => {
  return (
    <header className="recipient-topbar">
      <div className="left-section">
        <h2>Welcome, Recipient</h2>
      </div>
      <div className="right-section">
        <button className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default RecipientTopBar;
