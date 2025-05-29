import React, { useState } from 'react';
import './RecipientTopBar.scss';

function RecipientTopBar({ onSearch, onHelpClick, onNotificationsClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="recipient-topbar">
      <div className="left">
        <input
          type="text"
          placeholder="Search certificates..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="right">
        <button onClick={onNotificationsClick}>🔔</button>
        <button onClick={onHelpClick}>❓</button>

        <div className="profile-dropdown">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>👤</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button>Profile</button>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipientTopBar;
