// // import React from 'react';
// // import {
// //   PieChart, Pie, Cell,
// //   LineChart, Line, XAxis, YAxis, Tooltip, Legend,
// //   BarChart, Bar, ResponsiveContainer
// // } from 'recharts';
// // import './Analytics.scss';

// // const COLORS = ['#FFD700', '#0057B7', '#008080'];

// // const sessionData = [
// //   { name: 'Mobile', value: 37 },
// //   { name: 'Desktop', value: 14 },
// //   { name: 'Tablet', value: 9 },
// // ];

// // const lineData = [
// //   { date: '2 May', Mobile: 30, Desktop: 50, Tablet: 20 },
// //   { date: '4 May', Mobile: 35, Desktop: 40, Tablet: 30 },
// //   { date: '6 May', Mobile: 45, Desktop: 55, Tablet: 25 },
// //   { date: '8 May', Mobile: 32, Desktop: 48, Tablet: 40 },
// //   { date: '10 May', Mobile: 50, Desktop: 60, Tablet: 35 },
// // ];

// // const barData = [
// //   { name: 'Mobile', value: 40 },
// //   { name: 'Tablet', value: 30 },
// //   { name: 'Desktop', value: 15 },
// // ];

// // const Analytics = () => {
// //   return (
// //     <div className="analytics-dashboard">
// //       <h2>Device Analytics</h2>
// //       <div className="grid">
// //         <div className="card donut-chart">
// //           <h4>Sessions</h4>
// //           <ResponsiveContainer width="100%" height={200}>
// //             <PieChart>
// //               <Pie
// //                 data={sessionData}
// //                 cx="50%"
// //                 cy="50%"
// //                 outerRadius={60}
// //                 fill="#8884d8"
// //                 dataKey="value"
// //                 label
// //               >
// //                 {sessionData.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //               <Legend />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="card line-chart">
// //           <h4>Total Users</h4>
// //           <ResponsiveContainer width="100%" height={200}>
// //             <LineChart data={lineData}>
// //               <XAxis dataKey="date" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line type="monotone" dataKey="Mobile" stroke="#FFD700" />
// //               <Line type="monotone" dataKey="Desktop" stroke="#0057B7" />
// //               <Line type="monotone" dataKey="Tablet" stroke="#008080" />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="card bar-chart">
// //           <h4>Key Events</h4>
// //           <ResponsiveContainer width="100%" height={200}>
// //             <BarChart data={barData}>
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="value" fill="#028A0F" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Analytics;


// import React from 'react';
// import {
//   PieChart, Pie, Cell,
//   LineChart, Line, XAxis, YAxis, Tooltip, Legend,
//   BarChart, Bar, ResponsiveContainer
// } from 'recharts';
// import './Analytics.scss';

// // Colors for charts
// const COLORS = ['#FFD700', '#0057B7', '#008080'];

// // Pie Chart: Devices used for issuing certificates
// const deviceData = [
//   { name: 'Desktop', value: 60 },
//   { name: 'Mobile', value: 30 },
//   { name: 'Tablet', value: 10 },
// ];

// // Line Chart: Certificates issued over time
// const issuanceData = [
//   { date: 'Jan', Academic: 200, Training: 150, Professional: 100 },
//   { date: 'Feb', Academic: 220, Training: 160, Professional: 130 },
//   { date: 'Mar', Academic: 180, Training: 190, Professional: 140 },
//   { date: 'Apr', Academic: 250, Training: 170, Professional: 120 },
//   { date: 'May', Academic: 300, Training: 200, Professional: 180 },
// ];

// // Bar Chart: Breakdown by certificate type
// const typeData = [
//   { name: 'Academic', value: 1000 },
//   { name: 'Professional', value: 600 },
//   { name: 'Training', value: 800 },
// ];

// const Analytics = () => {
//   return (
//     <div className="analytics-dashboard">
//       <h2>Issuer Analytics Dashboard</h2>
//       <div className="grid">
//         {/* Devices Used */}
//         <div className="card donut-chart">
//           <h4>Devices Used for Issuing</h4>
//           <ResponsiveContainer width="100%" height={200}>
//             <PieChart>
//               <Pie
//                 data={deviceData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={60}
//                 dataKey="value"
//                 label
//               >
//                 {deviceData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Certificates Over Time */}
//         <div className="card line-chart">
//           <h4>Certificate Issuance Over Time</h4>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={issuanceData}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Academic" stroke="#FFD700" />
//               <Line type="monotone" dataKey="Training" stroke="#0057B7" />
//               <Line type="monotone" dataKey="Professional" stroke="#008080" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Certificate Types Breakdown */}
//         <div className="card bar-chart">
//           <h4>Certificate Types Issued</h4>
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={typeData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#028A0F" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;


import React from 'react';
import './Analytics.scss';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h2>Dashboard Analytics</h2>
      
      <div className="analytics-cards">
        <div className="analytics-card issued">
          <h3>Certificates Issued</h3>
          <p>120</p>
        </div>

        <div className="analytics-card revoked">
          <h3>Certificates Revoked</h3>
          <p>5</p>
        </div>

        <div className="analytics-card expired">
          <h3>Certificates Expired</h3>
          <p>8</p>
        </div>

        <div className="analytics-card verified">
          <h3>Successful Verifications</h3>
          <p>110</p>
        </div>

        <div className="analytics-card failed">
          <h3>Failed Verifications</h3>
          <p>2</p>
        </div>

        <div className="analytics-card activity-log">
          <h3>Recent Activities</h3>
          <ul>
            <li>Issued certificate to Jane Doe</li>
            <li>Revoked certificate #234</li>
            <li>Updated profile information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
