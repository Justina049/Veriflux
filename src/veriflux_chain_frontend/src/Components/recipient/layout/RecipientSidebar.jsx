import React from 'react';
import './RecipientSidebar.scss';

const RecipientSidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'certificates', label: 'My Certificates' },
    { id: 'verify', label: 'Verify Certificate' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'profile', label: 'Profile' },
    { id: 'help', label: 'Help' },
  ];

  return (
    <aside className="recipient-sidebar">
      <div className="logo">🎓 VeriFlux</div>
      <nav className="menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default RecipientSidebar;
