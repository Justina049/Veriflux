import React from 'react';
import './RecipientSidebar.scss';

function RecipientSidebar({ activeTab, onTabChange }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'certificates', label: 'My Certificates' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'help', label: 'Help' },
    { key: 'profile', label: 'Profile' }
  ];

  return (
    <div className="recipient-sidebar">
      <h2>📜 VeriFlux</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipientSidebar;
