// import React from 'react';
// import './IssuerSidebar.scss';
// import { FaTachometerAlt, FaPlus, FaFileAlt, FaBell, FaUser, FaQuestionCircle } from 'react-icons/fa';

// const IssuerSidebar = ({ activePage, setActivePage }) => {
//   return (
//     <div className="issuer-sidebar">
//       <div className="sidebar-logo">
//         <h2>VeriFlux</h2>
//       </div>
//       <nav className="nav-links">
//         <div
//           className={activePage === 'dashboard' ? 'active' : ''}
//           onClick={() => setActivePage('dashboard')}
//         >
//           <FaTachometerAlt /> <span>Dashboard</span>
//         </div>
//         <div
//           className={activePage === 'issue' ? 'active' : ''}
//           onClick={() => setActivePage('issue')}
//         >
//           <FaPlus /> <span>Issue Certificate</span>
//         </div>
//         <div
//           className={activePage === 'records' ? 'active' : ''}
//           onClick={() => setActivePage('records')}
//         >
//           <FaFileAlt /> <span>Certificate Records</span>
//         </div>
//         <div
//           className={activePage === 'notifications' ? 'active' : ''}
//           onClick={() => setActivePage('notifications')}
//         >
//           <FaBell /> <span>Notifications</span>
//         </div>
//         <div
//           className={activePage === 'profile' ? 'active' : ''}
//           onClick={() => setActivePage('profile')}
//         >
//           <FaUser /> <span>Profile</span>
//         </div>
//         <div
//           className={activePage === 'help' ? 'active' : ''}
//           onClick={() => setActivePage('help')}
//         >
//           <FaQuestionCircle /> <span>Help</span>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default IssuerSidebar;


import React from 'react';
import './IssuerSidebar.scss';
import {
  FaTachometerAlt,
  FaPlus,
  FaFileAlt,
  FaBell,
  FaUser,
  FaQuestionCircle,
  FaLayerGroup,
  FaUsers,
  FaChartBar,
  FaThList,
} from 'react-icons/fa';
function IssuerSidebar({ activeTab, setActivePage }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'issue', label: 'Issue Certificate' },
    { key: 'templates', label: 'Templates' },
    { key: 'help', label: 'Help' },
    { key: 'records', label: 'Certificate Records' },
    { key: 'customize', label: 'Customize' },
    { key: 'recipients', label: 'Recipients' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'notification', label: 'Notifications' },
    { key: 'profile', label: 'Profile' }
    // { key: 'profile', label: 'Profile' }
  ];

  return (
    <div className="recipient-sidebar">
      <h2>📜 VeriFlux</h2>
      <ul>
        {tabs.map((tab) => (
          // <li
          //   key={tab.key}
          //   className={activeTab === tab.key ? 'active' : ''}
          //   onClick={() => setActivePage(tab.key)}
          // >
          //   {tab.label}
          // </li>
          <li
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => setActivePage(tab.key)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}



// const IssuerSidebar = ({ activePage, setActivePage }) => {
//   const [activePage, setActivePage] = useState('my-certificates');
//   return (
//     <div className="issuer-sidebar">
//       <div className="sidebar-logo">
//         <h2>VeriFlux</h2>
//       </div>
//       <nav className="nav-links">
//         <div
//           className={activePage === 'dashboard' ? 'active' : ''}
//           onClick={() => setActivePage('dashboard')}
//         >
//           <FaTachometerAlt /> <span>Dashboard</span>
//         </div>

//         <div
//           className={activePage === 'issue' ? 'active' : ''}
//           onClick={() => setActivePage('issue')}
//         >
//           <FaPlus /> <span>Issue Certificate</span>
//         </div>

//         <div
//           className={activePage === 'templates' ? 'active' : ''}
//           onClick={() => setActivePage('templates')}
//         >
//           <FaLayerGroup /> <span>Templates</span>
//         </div>

//         <div
//           className={activePage === 'records' ? 'active' : ''}
//           onClick={() => setActivePage('records')}
//         >
//           <FaFileAlt /> <span>Certificate Records</span>
//         </div>

//         <div
//           className={activePage === 'recipients' ? 'active' : ''}
//           onClick={() => setActivePage('recipients')}
//         >
//           <FaUsers /> <span>Recipients</span>
//         </div>

//         <div
//           className={activePage === 'analytics' ? 'active' : ''}
//           onClick={() => setActivePage('analytics')}
//         >
//           <FaChartBar /> <span>Analytics</span>
//         </div>

//         <div
//           className={activePage === 'notifications' ? 'active' : ''}
//           onClick={() => setActivePage('notifications')}
//         >
//           <FaBell /> <span>Notifications</span>
//         </div>

//         <div
//           className={activePage === 'profile' ? 'active' : ''}
//           onClick={() => setActivePage('profile')}
//         >
//           <FaUser /> <span>Profile</span>
//         </div>

//         <div
//           className={activePage === 'help' ? 'active' : ''}
//           onClick={() => setActivePage('help')}
//         >
//           <FaQuestionCircle /> <span>Help</span>
//         </div>
//       </nav>
//     </div>
//   );
// };

export default IssuerSidebar;
