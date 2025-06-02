import React from "react";
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
} from "recharts";

// Dummy certificate data (same as before)
const dummyCertificates = [
  { id: 1, name: "John Doe", program: "Blockchain Fundamentals", issueDate: "2024-05-10", status: "Verified" },
  { id: 2, name: "Jane Smith", program: "Smart Contract Development", issueDate: "2024-04-22", status: "Pending" },
  { id: 3, name: "Alice Johnson", program: "Cryptography Basics", issueDate: "2024-03-15", status: "Verified" },
  { id: 4, name: "Bob Brown", program: "Decentralized Apps", issueDate: "2024-02-28", status: "Verified" },
  { id: 5, name: "Charlie Davis", program: "Blockchain Fundamentals", issueDate: "2024-01-10", status: "Pending" },
  { id: 6, name: "Diana Evans", program: "Smart Contract Development", issueDate: "2023-12-05", status: "Verified" },
];

// Colors for the chart
const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

const DashboardOverview = () => {
  const totalCertificates = dummyCertificates.length;

  // Count by status
  const statusCounts = dummyCertificates.reduce(
    (acc, cert) => {
      acc[cert.status] = (acc[cert.status] || 0) + 1;
      return acc;
    },
    {}
  );

  // Prepare data for pie chart
  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  // Summary cards data
  const summaryCards = [
    { title: "Total Certificates", value: totalCertificates, color: "#4caf50" },
    { title: "Verified Certificates", value: statusCounts.Verified || 0, color: "#2196f3" },
    { title: "Pending Certificates", value: statusCounts.Pending || 0, color: "#ff9800" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: "0 1rem" }}>
      <h2>Dashboard Overview</h2>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        {summaryCards.map(({ title, value, color }) => (
          <div
            key={title}
            style={{
              flex: 1,
              padding: "1.5rem",
              backgroundColor: color,
              color: "white",
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{title}</h3>
            <p style={{ fontSize: "2rem", margin: "0.5rem 0 0", fontWeight: "bold" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;
