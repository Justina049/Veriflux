// components/PopupModal.jsx
import React from "react";
import "./PopupModal.scss";

const PopupModal = ({ show, onClose, onLogin, onUpgrade }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Access Restricted</h3>
        <p>You must log in or upgrade your plan to continue.</p>
        <div className="popup-buttons">
          <button onClick={onLogin}>Login</button>
          <button onClick={onUpgrade}>Choose Plan</button>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupModal;
