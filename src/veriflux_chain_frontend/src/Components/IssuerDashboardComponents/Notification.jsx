import React, { useState } from "react";
import "./Notification.scss"; 

const dummyNotifications = [
  {
    id: 1,
    type: "info",
    message: "New certificate issued to You",
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

const Notification = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id} className={notif.read ? "read" : ""}>
            <div className="notif-content">
              <div>
                <p className={`message ${notif.type}`}>{notif.message}</p>
                <p className="timestamp">{notif.timestamp}</p>
              </div>
              {!notif.read && (
                <button onClick={() => markAsRead(notif.id)}>
                  Mark as read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
