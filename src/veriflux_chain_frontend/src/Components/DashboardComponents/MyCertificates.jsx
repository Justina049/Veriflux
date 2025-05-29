// import React from 'react';
// import './MyCertificates.scss';

// const MyCertificates = ({ certificates }) => {
//   return (
//     <div className="my-certificates">
//       <h2>My Certificates</h2>
//       <div className="cert-list">
//         {certificates.length === 0 ? (
//           <p>No certificates issued yet.</p>
//         ) : (
//           certificates.map((cert, index) => (
//             <div className="cert-card" key={index}>
//               <div className="cert-header">
//                 <h3>{cert.program}</h3>
//                 <span className={`status ${cert.status.toLowerCase()}`}>
//                   {cert.status}
//                 </span>
//               </div>
//               <p><strong>Issuer:</strong> {cert.issuer}</p>
//               <p><strong>Issued:</strong> {new Date(cert.issuedAt).toLocaleDateString()}</p>
//               <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="view-btn">
//                 View PDF
//               </a>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyCertificates;


import React, { useState, useEffect } from 'react';
import './MyCertificates.scss';

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Replace this mock with a fetch from your backend
    setCertificates([
      {
        issuer: 'University of Jos',
        recipient: 'Justina Enenche',
        email: 'justybaby_enny@yahoo.com',
        program: 'Blockchain Technology',
        issuedAt: new Date().toLocaleString(),
        hash: 'abc123def456',
        status: 'Valid',
        pdfUrl: '/certificates/sample.pdf'
      },
    ]);
  }, []);

  const filteredCerts = certificates.filter(cert =>
    cert.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-certificates">
      <h2>🎓 My Certificates</h2>

      <input
        type="text"
        placeholder="Search by program or issuer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {filteredCerts.length === 0 ? (
        <p className="no-results">No certificates found.</p>
      ) : (
        <div className="certificate-list">
          {filteredCerts.map((cert, index) => (
            <div key={index} className="certificate-card">
              <h3>{cert.program}</h3>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Recipient:</strong> {cert.recipient}</p>
              <p><strong>Email:</strong> {cert.email}</p>
              <p><strong>Issued At:</strong> {cert.issuedAt}</p>
              <p><strong>Status:</strong> <span className={`status ${cert.status.toLowerCase()}`}>{cert.status}</span></p>
              <p><strong>Hash:</strong> {cert.hash}</p>
              <a href={cert.pdfUrl} target="_blank" rel="noreferrer" className="pdf-button">View PDF</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCertificates;
