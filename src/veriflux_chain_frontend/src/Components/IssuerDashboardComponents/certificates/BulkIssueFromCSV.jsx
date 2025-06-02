// import React, { useState } from 'react';
// import { veriflux_chain_backend } from '../../../../../declarations/veriflux_chain_backend';
// import Papa from 'papaparse';
// // import '../BulkIssueFromCSV.scss';

// function BulkIssueFromCSV() {
//   const [csvData, setCsvData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: (result) => {
//         setCsvData(result.data);
//       },
//       error: (err) => {
//         setError('Failed to parse CSV');
//       }
//     });
//   };

//   const handleBulkIssue = async () => {
//     setLoading(true);
//     setError(null);
//     const issued = [];

//     for (const row of csvData) {
//       try {
//         const { issuer, recipient, email, program } = row;
//         const cert = await veriflux_chain_backend.issueCertificate(
//           issuer,
//           recipient,
//           email,
//           program
//         );
//         issued.push(cert);
//       } catch (err) {
//         issued.push({ error: err.message, ...row });
//       }
//     }

//     setResults(issued);
//     setLoading(false);
//   };

//   return (
//     <div className="bulk-csv">
//       <h3>Upload CSV for Bulk Issuance</h3>
//       <input type="file" accept=".csv" onChange={handleFileUpload} />

//       {csvData.length > 0 && (
//         <button onClick={handleBulkIssue} disabled={loading}>
//           {loading ? 'Issuing...' : 'Issue Certificates'}
//         </button>
//       )}

//       {error && <div className="alert error">{error}</div>}

//       {results.length > 0 && (
//         <div className="results">
//           <h4>Issuance Results</h4>
//           <ul>
//             {results.map((res, i) => (
//               <li key={i}>
//                 {res.hash ? (
//                   <>
//                     ✅ {res.recipient} - <strong>{res.program}</strong> - Issued
//                   </>
//                 ) : (
//                   <>
//                     ❌ {res.recipient} - Error: {res.error}
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BulkIssueFromCSV;



import React, { useState } from 'react';
import { veriflux_chain_backend } from '../../../../../declarations/veriflux_chain_backend';
import Papa from 'papaparse';
// import './BulkIssueFromCSV.scss'; // Optional for styling

function BulkIssueFromCSV() {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      },
      error: () => {
        setError('❌ Failed to parse CSV file. Please check the format.');
      }
    });
  };

  const handleBulkIssue = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    const issued = [];

    for (const row of csvData) {
      try {
        const { issuer, recipient, email, program } = row;

        if (!issuer || !recipient || !email || !program) {
          issued.push({ ...row, error: 'Missing required fields' });
          continue;
        }

        const cert = await veriflux_chain_backend.issueCertificate(
          issuer,
          recipient,
          email,
          program
        );

        issued.push(cert);
      } catch (err) {
        issued.push({ ...row, error: err.message || 'Issuance failed' });
      }
    }

    setResults(issued);
    setLoading(false);
  };

  return (
    <div className="bulk-csv">
      <h3>Bulk Certificate Issuance (via CSV)</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {csvData.length > 0 && (
        <button onClick={handleBulkIssue} disabled={loading}>
          {loading ? 'Issuing Certificates...' : `Issue ${csvData.length} Certificates`}
        </button>
      )}

      {error && <div className="alert error">{error}</div>}

      {results.length > 0 && (
        <div className="results">
          <h4>Issuance Results</h4>
          <ul>
            {results.map((res, i) => (
              <li key={i}>
                {res.hash ? (
                  <>✅ {res.recipient} - <strong>{res.program}</strong> - Issued</>
                ) : (
                  <>❌ {res.recipient || 'Unknown'} - Error: {res.error}</>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BulkIssueFromCSV;
