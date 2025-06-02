// import React from 'react';
// import './IssuerTopBar.scss';

// const IssuerTopBar = () => {
//   return (
//     <header className="issuer-topbar">
//       <span>Welcome, Issuer</span>
//       <div className="topbar-right">
//         <span>🔔</span>
//         <span>👤</span>
//       </div>
//     </header>
//   );
// };

// export default IssuerTopBar;


import React, { useState } from 'react';
// import { Bell } from 'lucide-react';
import './IssuerTopBar.scss';

const dummyNotifications = [
  {
    id: 1,
    type: "info",
    message: "New certificate issued for John Doe.",
    timestamp: "2025-05-28 10:30 AM",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    message: "Verification request pending for Certificate #1002.",
    timestamp: "2025-05-27 9:15 AM",
    read: true,
  },
  {
    id: 3,
    type: "success",
    message: "Certificate #1001 has been successfully verified.",
    timestamp: "2025-05-26 6:00 PM",
    read: false,
  },
];

const IssuerTopBar = ({ pageTitle = "Dashboard" }) => {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  return (
    <div className="issuer-topbar">
      <h2>{pageTitle}</h2>
      
      <div className="right-side">
        <span className="role-badge">Issuer</span>

        <div className="notification-wrapper">
          <div onClick={toggleDropdown} className="notification-icon-container">
            <div className="notification-icon" />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>

          {showDropdown && (
            <div className="notification-dropdown">
              <h4>Notifications</h4>
              <ul>
                {notifications.map((notif) => (
                  <li key={notif.id} className={`notif-item ${notif.read ? 'read' : ''}`}>
                    <div className={`notif-msg ${notif.type}`}>{notif.message}</div>
                    <div className="notif-meta">
                      <span>{notif.timestamp}</span>
                      {!notif.read && (
                        <button onClick={() => markAsRead(notif.id)}>Mark as read</button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="avatar">👤</div>
      </div>
    </div>
  );
};

export default IssuerTopBar;
