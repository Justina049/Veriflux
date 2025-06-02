import React from 'react';
import './RecipientSidebar.scss';

function RecipientSidebar({ activeTab, setActivePage }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'certificates', label: 'My Certificates' },
    { key: 'notification', label: 'Notifications' },
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
            onClick={() => setActivePage(tab.key)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipientSidebar;
