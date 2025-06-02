import React, { useState } from 'react';
import IssueSingleCertificate from '../certificates/IssueSingleCertificate';
import BulkIssueFromCSV from '../certificates/BulkIssueFromCSV';
import BulkIssueFromTable from '../certificates/BulkIssueFromTable';

function BulkIssueSelector() {
  const [mode, setMode] = useState('single');

  return (
    <div className="bulk-issue-selector">
      <h2>Issue Certificates</h2>

      <div className="mode-switcher">
        <label>
          <input type="radio" value="single" checked={mode === 'single'} onChange={() => setMode('single')} />
          Single Entry
        </label>
        <label>
          <input type="radio" value="csv" checked={mode === 'csv'} onChange={() => setMode('csv')} />
          Upload CSV
        </label>
        <label>
          <input type="radio" value="table" checked={mode === 'table'} onChange={() => setMode('table')} />
          Input Table
        </label>
      </div>

      <div className="mode-content">
        {mode === 'single' && <IssueSingleCertificate />}
        {mode === 'csv' && <BulkIssueFromCSV />}
        {mode === 'table' && <BulkIssueFromTable />}
      </div>
    </div>
  );
}

export default BulkIssueSelector;
