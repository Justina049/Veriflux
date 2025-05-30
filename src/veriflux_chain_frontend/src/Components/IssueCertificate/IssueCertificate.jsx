import React, { useState } from 'react';
// import { createActor } from '../../utils/agent';
import { veriflux_chain_backend } from '../../../../declarations/veriflux_chain_backend';
// import { withPlanProtection } from '../../utils/withPlanProtection';
import './IssueCertificate.scss';

function IssueCertificate({ onCertificateIssued }) {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

      if (typeof onCertificateIssued === 'function') {
        onCertificateIssued();
      }
      // onCertificateIssued();
      
      // Reset form
      setFormData({
        issuer: '',
        recipient: '',
        program: '',
        email: ''
       
      });
    } catch (err) {
      setError(err.message || 'An error occurred while issuing the certificate');
    } finally {
      setLoading(false);
    }
  };


//   try {
//     const backend = await createActor(); // Create actor here

//     // Normalize fields: trim + lowercase
//     const normalize = (str) => str.trim().toLowerCase();

//     const issuer = normalize(formData.issuer);
//     const recipient = normalize(formData.recipient);
//     const program = normalize(formData.program);
//     const issuedAt = BigInt(Date.now() * 1_000_000); // nanoseconds

//     const certificate = await veriflux_chain_backend.issueCertificate(
//       issuer,
//       recipient,
//       program,
//       issuedAt
//     );

//     setResult(certificate);

//     if (typeof onCertificateIssued === 'function') {
//       onCertificateIssued();
//     }

//     setFormData({
//       issuer: '',
//       recipient: '',
//       program: ''
//     });
//   } catch (err) {
//     setError(err.message || 'An error occurred while issuing the certificate');
//   } finally {
//     setLoading(false);
//   }
// };

  return (
    <div className="issue-certificate">
      <h2>Issue New Certificate</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="issuer">Issuer</label>
          <input
            type="text"
            id="issuer"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            required
            placeholder="Enter issuer name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="recipient">Recipient</label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
            placeholder="Enter recipient name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="program">Program</label>
          <input
            type="text"
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            placeholder="Enter program name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter recipient email"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Issue Certificate'}
        </button>
      </form>
      
      {error && (
        <div className="alert error">
          {error}
        </div>
      )}
      
      {result && (
        <div className="alert success">
          <h3>Certificate Issued Successfully!</h3>
          <p><strong>Hash:</strong> {result.hash}</p>
          <p><strong>Issuer:</strong> {result.issuer}</p>
          <p><strong>Recipient:</strong> {result.recipient}</p>
          <p><strong>Program:</strong> {result.program}</p>
          <p><strong>Issued At:</strong> {new Date(Number(result.issuedAt) / 1000000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default IssueCertificate;

