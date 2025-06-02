// import React, { useState } from 'react';
// import { veriflux_chain_backend } from '../../../../../declarations/veriflux_chain_backend';
// // import './IssueCertificate.scss';

// function IssueSingleCertificate({ onCertificateIssued }) {
//   const [formData, setFormData] = useState({
//     issuer: '',
//     recipient: '',
//     program: '',
//     email: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const { issuer, recipient, email, program } = formData;

//       const certificate = await veriflux_chain_backend.issueCertificate(
//         issuer,
//         recipient,
//         email,
//         program
//       );

//       setResult(certificate);
//       if (typeof onCertificateIssued === 'function') {
//         onCertificateIssued();
//       }

//       setFormData({
//         issuer: '',
//         recipient: '',
//         program: '',
//         email: ''
//       });
//     } catch (err) {
//       setError(err.message || 'An error occurred while issuing the certificate');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="issue-certificate">
//       <h3>Single Certificate Issuance</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Issuer</label>
//           <input
//             type="text"
//             name="issuer"
//             value={formData.issuer}
//             onChange={handleChange}
//             required
//             placeholder="Enter issuer name"
//           />
//         </div>

//         <div className="form-group">
//           <label>Recipient</label>
//           <input
//             type="text"
//             name="recipient"
//             value={formData.recipient}
//             onChange={handleChange}
//             required
//             placeholder="Enter recipient name"
//           />
//         </div>

//         <div className="form-group">
//           <label>Program</label>
//           <input
//             type="text"
//             name="program"
//             value={formData.program}
//             onChange={handleChange}
//             required
//             placeholder="Enter program name"
//           />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter recipient email"
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Issuing...' : 'Issue Certificate'}
//         </button>
//       </form>

//       {error && <div className="alert error">{error}</div>}

//       {result && (
//         <div className="alert success">
//           <h4>Certificate Issued!</h4>
//           <p><strong>Hash:</strong> {result.hash}</p>
//           <p><strong>Issuer:</strong> {result.issuer}</p>
//           <p><strong>Recipient:</strong> {result.recipient}</p>
//           <p><strong>Program:</strong> {result.program}</p>
//           <p><strong>Issued At:</strong> {new Date(Number(result.issuedAt) / 1000000).toLocaleString()}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default IssueSingleCertificate;


import React, { useState } from 'react';
import { veriflux_chain_backend } from '../../../../../declarations/veriflux_chain_backend';
// import './IssueCertificate.scss'; // Optional

function IssueSingleCertificate({ onCertificateIssued }) {
  const [formData, setFormData] = useState({
    issuer: '',
    recipient: '',
    program: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { issuer, recipient, email, program } = formData;
      const certificate = await veriflux_chain_backend.issueCertificate(
        issuer,
        recipient,
        email,
        program
      );

      setResult(certificate);
      if (onCertificateIssued) onCertificateIssued();

      setFormData({ issuer: '', recipient: '', program: '', email: '' });
    } catch (err) {
      setError(err.message || 'An error occurred while issuing the certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="issue-certificate">
      <h3>Issue Single Certificate</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Issuer</label>
          <input type="text" name="issuer" value={formData.issuer} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Recipient</label>
          <input type="text" name="recipient" value={formData.recipient} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Program</label>
          <input type="text" name="program" value={formData.program} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Issuing...' : 'Issue Certificate'}
        </button>
      </form>

      {error && <div className="alert error">{error}</div>}

      {result && (
        <div className="alert success">
          <h4>✅ Certificate Issued</h4>
          <p><strong>Hash:</strong> {result.hash}</p>
          <p><strong>Issuer:</strong> {result.issuer}</p>
          <p><strong>Recipient:</strong> {result.recipient}</p>
          <p><strong>Program:</strong> {result.program}</p>
          <p><strong>Issued At:</strong> {new Date(Number(result.issuedAt) / 1_000_000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default IssueSingleCertificate;
