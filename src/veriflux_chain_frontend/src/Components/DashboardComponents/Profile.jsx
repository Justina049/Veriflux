import React from 'react';
import './Profile.scss';

const Profile = () => {
  const user = {
    name: 'Welcome, Mich Nop',
    role: 'Recipient',
    certificateCount: 3,
    discount: '10% off next verification',
    history: [
      {
        program: 'Blockchain Fundamentals',
        startDate: 'Jan 10, 2025',
        endDate: 'Mar 10, 2025',
        status: 'Completed',
        certificateUrl: '/certificates/blockchain-fundamentals.pdf',
      },
      {
        program: 'AI in Education',
        startDate: 'Mar 15, 2025',
        endDate: 'May 15, 2025',
        status: 'Completed',
        certificateUrl: '/certificates/ai-in-education.pdf',
      },
      {
        program: 'Digital Identity Systems',
        startDate: 'Apr 20, 2025',
        endDate: 'May 25, 2025',
        status: 'Completed',
        certificateUrl: '/certificates/digital-identity.pdf',
      },
    ],
  };

  return (
    <div className="profile-page">
      <h2>{user.name}</h2>
      <div className="info-boxes">
        <div className="info-card">
          <h3>Role</h3>
          <p>{user.role}</p>
        </div>
        <div className="info-card">
          <h3>Certificates</h3>
          <p>{user.certificateCount}</p>
        </div>
        <div className="info-card">
          <h3>Discount</h3>
          <p>{user.discount}</p>
        </div>
      </div>

      <div className="certificate-history">
        <h3>Certificate History</h3>
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {user.history.map((item, idx) => (
              <tr key={idx}>
                <td>{item.program}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.status}</td>
                <td>
                  <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer">
                    View PDF
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

export default Profile;
