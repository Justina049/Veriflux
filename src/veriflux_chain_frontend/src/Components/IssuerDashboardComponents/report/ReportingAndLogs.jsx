// components/ReportingAndLogs.jsx
import React, { useState, useEffect } from 'react';
import './ReportingAndLogs.scss';

const mockCertificates = [
  {
    id: 'cert001',
    recipient: 'Chika Okoro',
    program: 'Frontend Engineering',
    status: 'Issued',
    issuedAt: new Date().toISOString(),
  },
  {
    id: 'cert002',
    recipient: 'Ayo Ade',
    program: 'Blockchain Basics',
    status: 'Revoked',
    issuedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const mockAuditLogs = [
  {
    id: 'log001',
    action: 'Issued certificate to Chika Okoro',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'log002',
    action: 'Revoked certificate for Ayo Ade',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

const ReportingAndLogs = () => {
  const [certificates, setCertificates] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    // Simulate fetch
    setCertificates(mockCertificates);
    setAuditLogs(mockAuditLogs);
  }, []);

  return (
    <div className="reporting-logs">
      <h2>Reporting & Logs</h2>
      <p>View certificate history and issuer audit logs.</p>

      <section>
        <h3>📄 Certificate History</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Program</th>
              <th>Status</th>
              <th>Issued At</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map(cert => (
              <tr key={cert.id}>
                <td>{cert.id}</td>
                <td>{cert.recipient}</td>
                <td>{cert.program}</td>
                <td className={cert.status === 'Issued' ? 'issued' : 'revoked'}>{cert.status}</td>
                <td>{new Date(cert.issuedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>🕵️ Audit Logs</h3>
        <ul className="audit-log">
          {auditLogs.map(log => (
            <li key={log.id}>
              <span className="timestamp">{new Date(log.timestamp).toLocaleString()}</span> — {log.action}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ReportingAndLogs;
