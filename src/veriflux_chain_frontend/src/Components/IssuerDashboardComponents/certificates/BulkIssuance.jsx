// import React, { useState } from 'react';
// import { veriflux_chain_backend } from '../../../../declarations/veriflux_chain_backend';
// import './BulkIssuance.scss';

// const BulkIssuance = () => {
//   const [csvData, setCsvData] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [status, setStatus] = useState('');
//   const [errors, setErrors] = useState([]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const text = event.target.result;
//       const lines = text.trim().split('\n');
//       const rows = lines.map((line) => {
//         const [issuer, recipient, email, program] = line.split(',');
//         return { issuer, recipient, email, program };
//       });

//       setCsvData(rows);
//     };
//     reader.readAsText(file);
//   };

//   const handleBulkIssue = async () => {
//     setUploading(true);
//     setStatus('');
//     setErrors([]);

//     const results = [];

//     for (const row of csvData) {
//       try {
//         const cert = await veriflux_chain_backend.issueCertificate(
//           row.issuer,
//           row.recipient,
//           row.email,
//           row.program
//         );
//         results.push(cert);
//       } catch (err) {
//         setErrors(prev => [...prev, `Error issuing for ${row.recipient}: ${err.message}`]);
//       }
//     }

//     setUploading(false);
//     setStatus(`Successfully issued ${results.length} certificate(s).`);
//   };

//   return (
//     <div className="bulk-issuance">
//       <h2>Bulk Certificate Issuance</h2>
//       <p>Upload a CSV file with fields: <code>issuer,recipient,email,program</code></p>

//       <input type="file" accept=".csv" onChange={handleFileUpload} />
      
//       {csvData.length > 0 && (
//         <button onClick={handleBulkIssue} disabled={uploading}>
//           {uploading ? 'Issuing...' : `Issue ${csvData.length} Certificates`}
//         </button>
//       )}

//       {status && <div className="success">{status}</div>}
//       {errors.length > 0 && (
//         <div className="error">
//           <h4>Errors:</h4>
//           <ul>
//             {errors.map((err, i) => <li key={i}>{err}</li>)}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BulkIssuance;



import React, { useState } from 'react';
import Papa from 'papaparse';
import { veriflux_chain_backend } from '../../../../declarations/veriflux_chain_backend';
import './BulkIssuance.scss';

const BulkIssuance = () => {
  const [csvData, setCsvData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
      },
      error: (error) => {
        setErrors(prev => [...prev, `CSV Parse Error: ${error.message}`]);
      }
    });
  };

  const handleBulkIssue = async () => {
    setUploading(true);
    setStatus('');
    setErrors([]);

    const results = [];

    for (const row of csvData) {
      const { issuer, recipient, email, program } = row;
      try {
        const cert = await veriflux_chain_backend.issueCertificate(
          issuer,
          recipient,
          email,
          program
        );
        results.push(cert);
      } catch (err) {
        setErrors(prev => [...prev, `Error issuing for ${recipient}: ${err.message}`]);
      }
    }

    setUploading(false);
    setStatus(`Successfully issued ${results.length} certificate(s).`);
  };

  return (
    <div className="bulk-issuance">
      <h2>Bulk Certificate Issuance</h2>
      <p>Upload a CSV file with headers: <code>issuer,recipient,email,program</code></p>

      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {csvData.length > 0 && (
        <button onClick={handleBulkIssue} disabled={uploading}>
          {uploading ? 'Issuing...' : `Issue ${csvData.length} Certificates`}
        </button>
      )}

      {status && <div className="success">{status}</div>}
      {errors.length > 0 && (
        <div className="error">
          <h4>Errors:</h4>
          <ul>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BulkIssuance;
