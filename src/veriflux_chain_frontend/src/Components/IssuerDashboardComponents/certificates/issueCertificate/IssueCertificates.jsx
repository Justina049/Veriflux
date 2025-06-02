import React, { useState } from 'react';
import IssueSingleCertificate from '../IssueSingleCertificate';
import BulkIssueFromTable from '../BulkIssueFromTable';
import BulkIssueFromCSV from '../BulkIssueFromCSV';
import './IssueCertificates.scss'; // Optional styling

function IssueCertificates() {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <div className="issue-certificates">
      <div className="tabs">
        <button
          className={activeTab === 'single' ? 'active' : ''}
          onClick={() => setActiveTab('single')}
        >
          Issue Single Certificate
        </button>
        <button
          className={activeTab === 'bulk' ? 'active' : ''}
          onClick={() => setActiveTab('bulk')}
        >
          Bulk Issue via CSV
        </button>
        <button
            className={activeTab === 'table' ? 'active' : ''}
            onClick={() => setActiveTab('table')}
        >
            Bulk Issue via Table
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'single' && <IssueSingleCertificate />}
        {activeTab === 'bulk' && <BulkIssueFromCSV />}
        {activeTab === 'table' && <BulkIssueFromTable />}
      </div>
    </div>
  );
}

export default IssueCertificates;
