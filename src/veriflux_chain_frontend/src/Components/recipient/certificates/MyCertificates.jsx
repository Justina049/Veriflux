import React from 'react';
import './MyCertificates.scss';

const MyCertificates = () => {
  // Sample data — in a real app, fetch this from backend or canister
  const certificates = [
    {
      id: 1,
      title: 'Blockchain Fundamentals',
      issuer: 'Domineum Blockchain Institute',
      issuedDate: '2024-05-20',
      status: 'Verified',
    },
    {
      id: 2,
      title: 'Web3 Bootcamp',
      issuer: 'Baze University',
      issuedDate: '2024-03-10',
      status: 'Pending',
    },
    {
      id: 3,
      title: 'Smart Contracts 101',
      issuer: 'ICP Academy',
      issuedDate: '2024-01-15',
      status: 'Verified',
    },
  ];

  return (
    <div className="recipient-certificates">
      <h1>My Certificates</h1>

      <table className="certificates-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Issuer</th>
            <th>Issued Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert.id}>
              <td>{cert.title}</td>
              <td>{cert.issuer}</td>
              <td>{cert.issuedDate}</td>
              <td>
                <span
                  className={
                    cert.status === 'Verified' ? 'status verified' : 'status pending'
                  }
                >
                  {cert.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCertificates;
