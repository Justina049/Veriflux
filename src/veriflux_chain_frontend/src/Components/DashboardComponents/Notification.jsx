// components/NotificationCenter.jsx
import React, { useState } from 'react';
import './Notification.scss';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sample notifications — you can replace with dynamic data later
  const notifications = [
    { id: 1, message: 'Certificate issued successfully.', time: '2 mins ago' },
    { id: 2, message: 'You updated your profile.', time: '1 hour ago' },
    { id: 3, message: 'System maintenance scheduled.', time: 'Yesterday' },
  ];

  return (
    <div className="notification-center">
      <button className="bell-button" onClick={() => setIsOpen(!isOpen)}>
        🔔
        {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </button>

      {isOpen && (
        <div className="dropdown">
          {notifications.length === 0 ? (
            <p className="empty">No notifications</p>
          ) : (
            notifications.map((note) => (
              <div key={note.id} className="notification-item">
                <p>{note.message}</p>
                <small>{note.time}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
