import React from 'react'

const RegularView = () => {
  return (
    <div>RegularView</div>
  )
}

export default RegularView

// === FRONTEND: React Recipient Dashboard ===

// import React, { useEffect, useState } from "react";
// // import { getCertificatesByRecipient } from "../utils/cert_backend"; // DFX canister call wrapper
// // import { useAuth } from "../auth/useAuth"; // Your auth context

// const RecipientDashboard = () => {
//   const { userPrincipal } = useAuth();
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const certs = await getCertificatesByRecipient(userPrincipal.toText());
//         setCertificates(certs);
//       } catch (err) {
//         console.error("Failed to fetch certificates:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (userPrincipal) fetchCertificates();
//   }, [userPrincipal]);

//   if (loading) return <div>Loading certificates...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">My Certificates</h2>
//       {certificates.length === 0 ? (
//         <p>No certificates found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {certificates.map((cert, index) => (
//             <div key={index} className="bg-white p-4 rounded-xl shadow">
//               <h3 className="text-lg font-semibold">{cert.title}</h3>
//               <p><strong>Issued By:</strong> {cert.issuer}</p>
//               <p><strong>Date:</strong> {cert.dateIssued}</p>
//               <p><strong>Status:</strong> {cert.status}</p>
//               {cert.fileUrl && (
//                 <a
//                   href={cert.fileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline mt-2 block"
//                 >
//                   View Certificate
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipientDashboard;
