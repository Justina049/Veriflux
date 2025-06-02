import React from 'react';
import './VerificationHistory.scss';

const historyData = [
  {
    id: 'abc123',
    status: 'valid',
    issuedTo: 'John Doe',
    issuedBy: 'ABC University',
    date: '2024-12-20',
    verifiedAt: '2025-05-28 10:30 AM'
  },
  {
    id: 'xyz789',
    status: 'invalid',
    issuedTo: '-',
    issuedBy: '-',
    date: '-',
    verifiedAt: '2025-05-28 11:00 AM'
  },
  {
    id: 'uvw456',
    status: 'valid',
    issuedTo: 'Jane Smith',
    issuedBy: 'XYZ Institute',
    date: '2025-01-10',
    verifiedAt: '2025-05-29 01:20 PM'
  }
];

const VerificationHistory = () => {
  return (
    <div className="verification-history">
      <h2>Verification History</h2>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Status</th>
              <th>Issued To</th>
              <th>Issued By</th>
              <th>Issued Date</th>
              <th>Verified At</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry, index) => (
              <tr key={index} className={entry.status}>
                <td>{entry.id}</td>
                <td>{entry.status === 'valid' ? '✅ Valid' : '❌ Invalid'}</td>
                <td>{entry.issuedTo}</td>
                <td>{entry.issuedBy}</td>
                <td>{entry.date}</td>
                <td>{entry.verifiedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationHistory;
