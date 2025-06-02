import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-section">
        <Topbar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
