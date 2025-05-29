import React from 'react';
import './RecipientProfile.scss';

const RecipientProfile = ({ user }) => {
  return (
    <div className="recipient-profile">
      <h2>Welcome, {user.name} 👋</h2>
      <p className="role">Role: {user.role}</p>

      <div className="stats">
        <div className="stat-box">
          <h3>{user.certificates.length}</h3>
          <p>Certificates</p>
        </div>
        <div className="stat-box">
          <h3>{user.discount}%</h3>
          <p>Discount</p>
        </div>
      </div>

      <div className="history">
        <h3>Certificate History</h3>
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {user.certificates.map((cert, index) => (
              <tr key={index}>
                <td>{cert.program}</td>
                <td>{cert.startDate}</td>
                <td>{cert.endDate}</td>
                <td>{cert.completed ? 'Completed' : 'In Progress'}</td>
                <td>
                  <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipientProfile;
