import React, { useState } from 'react';
import './RecipientDashboard.scss';

// Layout
import RecipientSidebar from './layout/RecipientSidebar';
import RecipientTopBar from './layout/RecipientTopBar';

// Pages
import DashboardOverview from './overview/DashboardOverview';
import MyCertificates from './certificates/MyCertificates';
import VerifyCertificate from './verify/VerifyCertificate';
import Notification from './notification/Notification';
import RecipientProfile from './profile/RecipientProfile';
import Help from './help/Help';

const RecipientDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'certificates':
        return <MyCertificates />;
      case 'verify':
        return <VerifyCertificate />;
      case 'notifications':
        return <Notification />;
      case 'profile':
        return <RecipientProfile />;
      case 'help':
        return <Help />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="recipient-dashboard">
      <RecipientSidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-content">
        <RecipientTopBar />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
