import React, { useState } from 'react';
import './IssueCertificate.scss';

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    courseTitle: '',
    issueDate: '',
    certificateId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Issuing certificate:', formData);
    // 🔁 Later: Connect to ICP backend to mint
  };

  return (
    <div className="issue-certificate">
      <h2>Issue New Certificate</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient Name
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Course Title
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Issue Date
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Certificate ID
          <input
            type="text"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Mint Certificate</button>
      </form>
    </div>
  );
};

export default IssueCertificate;
