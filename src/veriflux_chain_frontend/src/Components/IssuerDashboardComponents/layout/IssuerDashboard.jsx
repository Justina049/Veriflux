import React, { useState } from 'react';
import './IssuerDashboard.scss';
import IssuerSidebar from '../../IssuerDashboardComponents/layout/IssuerSidebar';
import IssuerTopBar from '../../IssuerDashboardComponents/layout/IssuerTopBar';
// import DashboardOverview from '../../IssuerDashboardComponents/overview/DashboardOverview';
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

import Help from '../Help';
// import Profile from '../../../Components/IssuerDashboardComponents/Profile';
import Notification from '../../IssuerDashboardComponents/Notification';
import DashboardOverview from '../overview/DashboardOverview';
import Analytics from '../analytics/Analytics';
import CertificateRecords from '../issue/CertificateRecords';
import CertificateTemplates from '../certificates/CertificateTemplates';
import RecipientManagement from '../settings/RecipientManagement';
import IssuerProfile from '../IssuerProfile';
import IssueCertificates from '../certificates/issueCertificate/IssueCertificates';
import Customization from '../Customization';
const IssuerDashboard = () => {
  const [activePage, setActivePage] = useState('issue');
  
    const handleSearch = (query) => {
      console.log('Searching for:', query); // Later you can implement filtering logic here
    };
  
    const handleHelpClick = () => {
      setActivePage('help');
    };
  
    const handleNotificationClick = () => {
      setActivePage('notification');
    };
  
    const renderPage = () => {

      switch (activePage) {
        case 'dashboard':
          return <DashboardOverview />;
        case 'issue':
          return <IssueCertificates />;
        case 'templates':
          return <CertificateTemplates />;
        case 'help':
          return <Help />;
        case 'records':
          return <CertificateRecords/>;
        case 'customize':
          return <Customization/>;
        case 'recipients':
          return <RecipientManagement />;
        case 'analytics':
          return <Analytics />;
        case 'notification':
          return <Notification />;
        case 'profile':
          return <IssuerProfile />;
        // case 'certificate-history':
        //   return <CertificateHistory />;
        default:
          return <DashboardOverview />;
      }
    };
  
    return (
      <div className="recipient-dashboard">
        <IssuerSidebar setActivePage={setActivePage} activeTab={activePage} />
        <div className="main-content">
          <IssuerTopBar 
            onSearch={handleSearch}
            onHelpClick={handleHelpClick}
            onNotificationsClick={handleNotificationClick}
          />
          <div className="dashboard-body">
            {renderPage()}
          </div>
        </div>
      </div>
    );
  
  // return (
  //   <>
  //     <div className="issuer-dashboard">
  //       <IssuerSidebar />
  //     </div>
  //     <div className="dashboard-main">
  //       <IssuerTopBar />
  //     </div>
  //     <div className="dashboard-content">
  //       <DashboardOverview />
  //     </div>
  //   </>

  // );
};

export default IssuerDashboard;
