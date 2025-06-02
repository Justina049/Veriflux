import React, { useState } from 'react';
import { veriflux_chain_backend } from '../../../../../declarations/veriflux_chain_backend';
import './BulkIssueCertificate.scss';
// import './BulkIssueFromTable.scss';

function BulkIssueFromTable() {
  const [entries, setEntries] = useState([
    { issuer: '', recipient: '', email: '', program: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addRow = () => {
    setEntries([...entries, { issuer: '', recipient: '', email: '', program: '' }]);
  };

  const removeRow = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const handleBulkIssue = async () => {
    setLoading(true);
    const issued = [];

    for (const entry of entries) {
      try {
        const { issuer, recipient, email, program } = entry;
        const cert = await veriflux_chain_backend.issueCertificate(
          issuer,
          recipient,
          email,
          program
        );
        issued.push(cert);
      } catch (err) {
        issued.push({ error: err.message, ...entry });
      }
    }

    setResults(issued);
    setLoading(false);
  };

  return (
    <div className="bulk-table">
      <h3>Manual Table Entry</h3>
      <table>
        <thead>
          <tr>
            <th>Issuer</th>
            <th>Recipient</th>
            <th>Email</th>
            <th>Program</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td><input value={entry.issuer} onChange={(e) => handleChange(index, 'issuer', e.target.value)} /></td>
              <td><input value={entry.recipient} onChange={(e) => handleChange(index, 'recipient', e.target.value)} /></td>
              <td><input value={entry.email} onChange={(e) => handleChange(index, 'email', e.target.value)} /></td>
              <td><input value={entry.program} onChange={(e) => handleChange(index, 'program', e.target.value)} /></td>
              <td><button onClick={() => removeRow(index)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow}>Add Row</button>
      <button onClick={handleBulkIssue} disabled={loading || entries.length === 0}>
        {loading ? 'Issuing...' : 'Issue Certificates'}
      </button>

      {results.length > 0 && (
        <div className="results">
          <h4>Issuance Results</h4>
          <ul>
            {results.map((res, i) => (
              <li key={i}>
                {res.hash ? (
                  <>
                    ✅ {res.recipient} - <strong>{res.program}</strong> - Issued
                  </>
                ) : (
                  <>
                    ❌ {res.recipient} - Error: {res.error}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BulkIssueFromTable;