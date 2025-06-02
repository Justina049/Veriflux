// components/Customization.jsx
import React, { useState } from 'react';
import './Customization.scss';

const Customization = () => {
  const [brandSettings, setBrandSettings] = useState({
    orgName: '',
    themeColor: '#0057ff',
    logo: null
  });

  const [designSettings, setDesignSettings] = useState({
    layout: 'classic',
    customFields: ['Completion Date', 'Instructor Name']
  });

  const handleBrandChange = (e) => {
    const { name, value, files } = e.target;
    setBrandSettings((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleAddField = () => {
    setDesignSettings((prev) => ({
      ...prev,
      customFields: [...prev.customFields, '']
    }));
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...designSettings.customFields];
    updatedFields[index] = value;
    setDesignSettings((prev) => ({
      ...prev,
      customFields: updatedFields
    }));
  };

  return (
    <div className="customization">
      <h2>Customization</h2>
      <p>Customize branding and certificate design</p>

      <div className="section">
        <h3>🎨 Branding</h3>
        <div className="form-group">
          <label>Organization Name</label>
          <input
            type="text"
            name="orgName"
            value={brandSettings.orgName}
            onChange={handleBrandChange}
            placeholder="e.g. VeriFlux Institute"
          />
        </div>

        <div className="form-group">
          <label>Theme Color</label>
          <input
            type="color"
            name="themeColor"
            value={brandSettings.themeColor}
            onChange={handleBrandChange}
          />
        </div>

        <div className="form-group">
          <label>Upload Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleBrandChange}
          />
        </div>
      </div>

      <div className="section">
        <h3>📑 Certificate Design</h3>
        <div className="form-group">
          <label>Layout</label>
          <select
            value={designSettings.layout}
            onChange={(e) =>
              setDesignSettings({ ...designSettings, layout: e.target.value })
            }
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Custom Fields</label>
          {designSettings.customFields.map((field, index) => (
            <input
              key={index}
              type="text"
              value={field}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              placeholder="Enter custom field name"
              style={{ marginBottom: '0.5rem' }}
            />
          ))}
          <button type="button" onClick={handleAddField}>
            + Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customization;
