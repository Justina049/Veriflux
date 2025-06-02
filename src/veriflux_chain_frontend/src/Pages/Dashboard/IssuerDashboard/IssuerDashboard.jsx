// // import React, { useState } from "react";
 import "./IssuerDashboard.scss";

// Sidebar and Topbar
 import IssuerSidebar from "../../../Components/IssuerDashboardComponents/IssuerSidebar";
 import IssuerTopBar from "../../../Components/IssuerDashboardComponents/IssuerTopBar";

 // Dashboard Components
 import DashboardOverview from "../../../Components/IssuerDashboardComponents/overview/DashboardOverview";
 import IssueCertificate from "../../../Components/IssueCertificate/IssueCertificate";
 import CertificateRecords from "../../../Components/IssuerDashboardComponents/CertificateRecords";
 import Notification from "../../../Components/IssuerDashboardComponents/Notification";
 import IssuerProfile from "../../../Components/IssuerDashboardComponents/IssuerProfile";
 import Help from "../../../Components/IssuerDashboardComponents/Help";
 import Analytics from "../../../Components/IssuerDashboardComponents/Analytics"; // optional

// // const IssuerDashboard = () => {
// //   const [activePage, setActivePage] = useState("dashboard");

// //   const menuItems = [
// //     { id: "dashboard", label: "Dashboard" },
// //     { id: "issue", label: "Issue Certificate" },
// //     { id: "records", label: "Certificate Records" },
// //     { id: "notifications", label: "Notifications" },
// //     { id: "profile", label: "Profile" },
// //     { id: "help", label: "Help" },
// //     { id: "analytics", label: "Analytics" },
// //   ];

// //   const renderComponent = () => {
// //     switch (activePage) {
// //       case "dashboard":
// //         return <DashboardOverview />;
// //       case "issue":
// //         return <IssueCertificate />;
// //       case "records":
// //         return <CertificateRecords />;
// //       case "notifications":
// //         return <Notification />;
// //       case "profile":
// //         return <IssuerProfile />;
// //       case "help":
// //         return <Help />;
// //       case "analytics":
// //         return <Analytics />;
// //       default:
// //         return <DashboardOverview />;
// //     }
// //   };

// //   return (
// //     <div className="issuer-dashboard flex">
// //       <IssuerSidebar
// //         activePage={activePage}
// //         setActivePage={setActivePage}
// //         menuItems={menuItems}
// //       />

// //       <div className="flex-1 flex flex-col">
// //         <IssuerTopBar />
// //         <main className="p-4 bg-gray-100 min-h-screen">{renderComponent()}</main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default IssuerDashboard;












// import React, { useState } from 'react';
// import './IssuerDashboard.scss';

// // Layout Components
// import IssuerSidebar from '../../../Components/IssuerDashboardComponents/layout/IssuerSidebar';
// import IssuerTopBar from '../../../Components/IssuerDashboardComponents/layout/IssuerTopBar';

// // Dashboard Pages
// import DashboardOverview from '../../../Components/IssuerDashboardComponents/overview/DashboardOverview';
// import IssueCertificate from '../../../Components/IssueCertificate/IssueCertificate';
// import CertificateRecords from '../../../Components/IssuerDashboardComponents/issue/CertificateRecords';
// import Notification from '../../../Components/IssuerDashboardComponents/Notification';
// import IssuerProfile from '../../../Components/IssuerDashboardComponents/IssuerProfile';
// import Help from '../../../Components/IssuerDashboardComponents/Help';

// const IssuerDashboard = () => {
//   const [activePage, setActivePage] = useState('dashboard');

//   const renderContent = () => {
//     switch (activePage) {
//       case 'dashboard':
//         return <DashboardOverview />;
//       case 'issue':
//         return <IssueCertificate />;
//       case 'records':
//         return <CertificateRecords />;
//       case 'notifications':
//         return <Notification />;
//       case 'profile':
//         return <IssuerProfile />;
//       case 'help':
//         return <Help />;
//       default:
//         return <DashboardOverview />;
//     }
//   };

//   return (
//     <div className="issuer-dashboard">
//       <IssuerSidebar activePage={activePage} setActivePage={setActivePage} />
//       <div className="main-content">
//         <IssuerTopBar />
//         <div className="content-area">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssuerDashboard;




import React, { useState } from 'react';
// import IssuerSidebar from '../../../Components/IssuerDashboardComponents/IssuerSidebar';
// import IssuerDashboard from '../../../Components/IssuerDashboardComponents/layout/IssuerDashboard';
// import IssueCertificate from './IssueCertificate';
// import Templates from './Templates';
// import BulkIssuance from './BulkIssuance';
// import CertificateRecords from './CertificateRecords';
// import Analytics from './Analytics';
// import Recipients from './Recipients';
// import Notifications from './Notifications';
// import Profile from './Profile';
// import Help from './Help';
// import Logs from './ReportingLogs';
// import Customization from './Customization';

import './IssuerDashboard.scss';
import BulkIssueSelector from "../../../Components/IssuerDashboardComponents/layout/BulkIssueSelector";

const IssuerDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      // case 'dashboard':
      //   return <Dashboard />;
      // case 'issue':
      //   return <BulkIssueSelector />;
      // case 'templates':
      //   return <Templates />;
      // case 'bulk':
      //   return <BulkIssuance />;
      // case 'records':
      //   return <CertificateRecords />;
      // case 'analytics':
      //   return <Analytics />;
      // case 'recipients':
      //   return <Recipients />;
      // case 'notifications':
      //   return <Notification />;
      // case 'profile':
      //   return <Profile />;
      // case 'help':
      //   return <Help />;
      // case 'logs':
      //   return <Logs />;
      // case 'customization':
      //   return <Customization />;
      // // default:
        // return <Dashboard />;
    }
  };

  return (
    <div className="issuer-dashboard">
      <IssuerSidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default IssuerDashboard;
