// components/VerificationTracking.jsx
import React, { useEffect, useState } from 'react';
import './VerificationTracking.scss';

const mockLogs = [
  {
    timestamp: '2025-05-28 10:45 AM',
    certificateId: 'CERT-001',
    verifier: 'janedoe@gmail.com',
    result: 'Success',
  },
  {
    timestamp: '2025-05-28 11:12 AM',
    certificateId: 'CERT-002',
    verifier: 'anonymous',
    result: 'Failed',
  },
  {
    timestamp: '2025-05-28 11:30 AM',
    certificateId: 'CERT-001',
    verifier: 'janedoe@gmail.com',
    result: 'Success',
  },
  {
    timestamp: '2025-05-28 11:32 AM',
    certificateId: 'CERT-002',
    verifier: 'anonymous',
    result: 'Failed',
  },
];

const VerificationTracking = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Replace with API call in real implementation
    setLogs(mockLogs);
  }, []);

  return (
    <div className="verification-tracking">
      <h2>Verification Tracking</h2>
      <p>Monitor verification attempts and detect potential fraud or abuse.</p>

      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Certificate ID</th>
            <th>Verifier</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.certificateId}</td>
              <td>{log.verifier}</td>
              <td className={log.result === 'Success' ? 'success' : 'failed'}>
                {log.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationTracking;
