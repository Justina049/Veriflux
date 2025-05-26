import React, { useEffect, useState } from 'react';
import { veriflux_chain_backend } from '../../../../declarations/veriflux_chain_backend';
import './CertificateList.scss';

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const certs = await veriflux_chain_backend.listCertificates();
      setCertificates(certs);
    } catch (error) {
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div>
      <div className="certificate-list-header">
        <h2 className="certificate-list-title">All Certificates</h2>
        <button
          onClick={fetchCertificates}
          disabled={loading}
          className="certificate-list-refresh-btn"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {loading ? (
        <div className="certificate-list-message">
          <p>Loading certificates...</p>
        </div>
      ) : certificates.length === 0 ? (
        <div className="certificate-list-message">
          <p>No certificates found</p>
        </div>
      ) : (
        <div className="certificate-list-grid">
          {certificates.map((cert) => (
            <div
              key={cert.hash}
              className="certificate-list-card"
            >
              <h3 className="certificate-list-card-title">{cert.program}</h3>
              <p><strong>Recipient:</strong> {cert.recipient}</p>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p>
                <strong>Date:</strong> {new Date(Number(cert.issuedAt) / 1000000).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>
                <span className={cert.status === 'Valid' ? 'certificate-list-card-valid' : 'certificate-list-card-invalid'}>
                  {cert.status}
                </span>
              </p>
              <p className="certificate-list-card-hash">
                <strong>Hash:</strong> {cert.hash}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificateList;