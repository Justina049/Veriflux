import React from 'react';
import './Dashboard.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample data (replace with API data later)
  const summary = {
    total: 1240,
    valid: 1180,
    invalid: 60,
    thisMonth: 220,
  };

  const data = [
    { month: 'Jan', verifications: 100 },
    { month: 'Feb', verifications: 150 },
    { month: 'Mar', verifications: 120 },
    { month: 'Apr', verifications: 160 },
    { month: 'May', verifications: 180 },
  ];

  return (
    <div className="dashboard">
      <h2>Overview</h2>
      <div className="cards">
        <div className="card total">
          <h3>Total Verifications</h3>
          <p>{summary.total}</p>
        </div>
        <div className="card valid">
          <h3>Valid Certificates</h3>
          <p>{summary.valid}</p>
        </div>
        <div className="card invalid">
          <h3>Invalid Certificates</h3>
          <p>{summary.invalid}</p>
        </div>
        <div className="card month">
          <h3>This Month</h3>
          <p>{summary.thisMonth}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Verification Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="verifications" fill="#101C44" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
