// import React, { useState } from 'react';
// import RecipientSidebar from './RecipientSidebar';
// import RecipientTopBar from './RecipientTopBar';

// function RecipientDashboard() {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const handleSearch = (query) => {
//     console.log('Searching for:', query);
//   };

//   const handleHelpClick = () => {
//     console.log('Help clicked');
//   };

//   const handleNotificationsClick = () => {
//     console.log('Notifications clicked');
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <RecipientSidebar activeTab={activeTab} onTabChange={setActiveTab} />
//       <div style={{ flexGrow: 1 }}>
//         <RecipientTopBar
//           onSearch={handleSearch}
//           onHelpClick={handleHelpClick}
//           onNotificationsClick={handleNotificationsClick}
//         />
//         {/* Placeholder for actual tab content */}
//         <div style={{ padding: '2rem' }}>
//           <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecipientDashboard;


import React, { useState } from 'react';
import './RecipientDashboard.scss';

// Sidebar and Topbar
import RecipientSidebar from '../../../Components/DashboardComponents/RecipientSidebar';
import RecipientTopBar from '../../../Components/DashboardComponents/RecipientTopBar';
// import SearchBar from '../../../Components/DashboardComponents/SearchBar';

// Main Page Components
import MyCertificates from '../../../Components/DashboardComponents/MyCertificates';
import Help from '../../../Components/DashboardComponents/Help';
import Profile from '../../../Components/DashboardComponents/Profile';
import Notification from '../../../Components/DashboardComponents/Notification';
import CertificateHistory from '../../../Components/DashboardComponents/CertificateHistory';

const RecipientDashboard = () => {
  const [activePage, setActivePage] = useState('my-certificates');

//   const renderPage = () => {
//     switch (activePage) {
//       case 'my-certificates':
//         return <MyCertificates />;
//       case 'help':
//         return <Help />;
//       case 'profile':
//         return <Profile />;
//       case 'notification':
//         return <Notification />;
//       case 'certificate-history':
//         return <CertificateHistory />;
//       default:
//         return <MyCertificates />;
//     }
//   };

//   return (
//     <div className="recipient-dashboard">
//       <RecipientSidebar setActivePage={setActivePage} activePage={activePage} />
//       <div className="main-content">
//         <RecipientTopBar />
//         {/* <SearchBar /> */}
//         <div className="dashboard-body">
//           {renderPage()}
//         </div>
//       </div>
//     </div>
//   );
// };

const menuItems = [
    { id: 'my-certificates', label: 'My Certificates' },
    { id: 'certificate-history', label: 'Certificate History' },
    { id: 'notification', label: 'Notifications' },
    { id: 'profile', label: 'Profile' },
    { id: 'help', label: 'Help' },
  ];

  return (
    <div className="recipient-sidebar">
      <h2 className="sidebar-title">📘 VeriFlux</h2>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipientDashboard;
