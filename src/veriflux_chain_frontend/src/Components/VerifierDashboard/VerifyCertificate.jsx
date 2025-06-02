import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './VerifyCertificate.scss';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const mockVerify = async (id) => {
    setLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isValid = id === 'abc123' || id === 'xyz789';
    const fakeResult = isValid
      ? { status: 'valid', issuedTo: 'John Doe', issuedBy: 'ABC University', date: '2024-12-20' }
      : { status: 'invalid' };

    setResult(fakeResult);
    setLoading(false);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (certId.trim()) mockVerify(certId.trim());
  };

  const handleScan = (data) => {
    if (data) {
      setCertId(data);
      setShowScanner(false);
      mockVerify(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="verify-certificate">
      <h2>Verify Certificate</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter Certificate ID or Hash"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        <button type="button" className="qr-toggle" onClick={() => setShowScanner(!showScanner)}>
          {showScanner ? 'Close QR Scanner' : 'Scan QR'}
        </button>
      </form>

      {showScanner && (
        <div className="scanner-box">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      )}

      {result && (
        <div className={`result ${result.status}`}>
          {result.status === 'valid' ? (
            <>
              <h3>✅ Certificate is Valid</h3>
              <p><strong>Issued To:</strong> {result.issuedTo}</p>
              <p><strong>Issued By:</strong> {result.issuedBy}</p>
              <p><strong>Date:</strong> {result.date}</p>
            </>
          ) : (
            <h3>❌ Certificate is Invalid</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
