import React, { useState } from 'react';
import './VerificationSettings.scss';

const VerificationSettings = () => {
  const [settings, setSettings] = useState({
    enableQR: true,
    enableUID: true,
    enableLink: true,
    expirationDays: 365,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Settings:', settings);
    alert('Verification settings updated successfully!');
  };

  return (
    <div className="verification-settings">
      <h2>Verification Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="enableQR"
            name="enableQR"
            checked={settings.enableQR}
            onChange={handleChange}
          />
          <label htmlFor="enableQR">Enable QR Code Verification</label>
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="enableUID"
            name="enableUID"
            checked={settings.enableUID}
            onChange={handleChange}
          />
          <label htmlFor="enableUID">Enable UID Verification</label>
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="enableLink"
            name="enableLink"
            checked={settings.enableLink}
            onChange={handleChange}
          />
          <label htmlFor="enableLink">Enable Link-Based Verification</label>
        </div>

        <div className="form-group">
          <label htmlFor="expirationDays">Link Expiry (days)</label>
          <input
            type="number"
            id="expirationDays"
            name="expirationDays"
            min="1"
            max="3650"
            value={settings.expirationDays}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default VerificationSettings;
