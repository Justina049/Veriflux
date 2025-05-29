import React from 'react';
import './CertificateHistory.scss';

const CertificateHistory = () => {
  const history = [
    {
      program: 'Blockchain Technology',
      issuer: 'University of Jos',
      startDate: 'Jan 1, 2024',
      endDate: 'June 30, 2024',
      completed: true,
      pdfUrl: '/certificates/history-sample1.pdf',
    },
    {
      program: 'AI for Beginners',
      issuer: 'Baze University',
      startDate: 'Feb 10, 2023',
      endDate: 'Aug 15, 2023',
      completed: true,
      pdfUrl: '/certificates/history-sample2.pdf',
    },
    {
      program: 'Web3 Essentials',
      issuer: 'Domineum Academy',
      startDate: 'March 1, 2022',
      endDate: 'Sept 1, 2022',
      completed: false,
      pdfUrl: null,
    }
  ];

  return (
    <div className="certificate-history">
      <h2>📜 Certificate History</h2>

      {history.length === 0 ? (
        <p>No certificate history available.</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className={`history-item ${item.completed ? 'completed' : 'in-progress'}`}>
              <h3>{item.program}</h3>
              <p><strong>Issuer:</strong> {item.issuer}</p>
              <p><strong>Start Date:</strong> {item.startDate}</p>
              <p><strong>End Date:</strong> {item.endDate}</p>
              <p><strong>Status:</strong> {item.completed ? '✅ Completed' : '⏳ In Progress'}</p>
              {item.completed && item.pdfUrl && (
                <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="view-pdf">View PDF</a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CertificateHistory;
