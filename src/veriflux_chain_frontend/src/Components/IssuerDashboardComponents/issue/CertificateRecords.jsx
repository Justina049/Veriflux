import React, { useState, useMemo } from "react";
////////////////////////////////
const dummyCertificates = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    program: "Blockchain Fundamentals",
    issueDate: "2024-05-10",
    status: "Verified",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    program: "Smart Contract Development",
    issueDate: "2024-04-22",
    status: "Pending",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    program: "Cryptography Basics",
    issueDate: "2024-03-15",
    status: "Verified",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    program: "Decentralized Apps",
    issueDate: "2024-02-28",
    status: "Verified",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    program: "Blockchain Fundamentals",
    issueDate: "2024-01-10",
    status: "Pending",
  },
  {
    id: 6,
    name: "Diana Evans",
    email: "diana@example.com",
    program: "Smart Contract Development",
    issueDate: "2023-12-05",
    status: "Verified",
  },
];

const ITEMS_PER_PAGE = 3;

const CertificateRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter certificates by search term
  const filteredCertificates = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return dummyCertificates.filter((cert) => {
      return (
        cert.name.toLowerCase().includes(term) ||
        cert.email.toLowerCase().includes(term) ||
        cert.program.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  // Sort the filtered certificates
  const sortedCertificates = useMemo(() => {
    if (!sortConfig.key) return filteredCertificates;

    const sorted = [...filteredCertificates].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "issueDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredCertificates, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedCertificates.length / ITEMS_PER_PAGE);
  const currentItems = sortedCertificates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Request sort by column
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to page 1 on new sort
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? " ▲" : " ▼";
  };

  // Change page safely
  const goToPage = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // Styles
  const styles = {
    container: {
      maxWidth: 900,
      margin: "2rem auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "0 1rem",
    },
    input: {
      width: "100%",
      maxWidth: 400,
      padding: "0.5rem 0.75rem",
      marginBottom: "1rem",
      fontSize: "1rem",
      borderRadius: 4,
      border: "1px solid #ccc",
      boxSizing: "border-box",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    th: {
      padding: "12px 15px",
      borderBottom: "2px solid #ddd",
      cursor: "pointer",
      userSelect: "none",
      backgroundColor: "#f4f4f4",
      textAlign: "left",
      fontWeight: "600",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #eee",
    },
    pagination: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
    },
    button: {
      padding: "0.4rem 1rem",
      fontSize: "1rem",
      borderRadius: 4,
      border: "1px solid #007bff",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    buttonDisabled: {
      backgroundColor: "#cccccc",
      borderColor: "#cccccc",
      cursor: "not-allowed",
    },
    noData: {
      textAlign: "center",
      padding: "2rem 0",
      color: "#666",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Certificate Records</h2>
      <input
        type="text"
        placeholder="Search by name, email, or program"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
        style={styles.input}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th} onClick={() => requestSort("name")}>
              Name{getSortArrow("name")}
            </th>
            <th style={styles.th} onClick={() => requestSort("email")}>
              Email{getSortArrow("email")}
            </th>
            <th style={styles.th} onClick={() => requestSort("program")}>
              Program{getSortArrow("program")}
            </th>
            <th style={styles.th} onClick={() => requestSort("issueDate")}>
              Issue Date{getSortArrow("issueDate")}
            </th>
            <th style={styles.th} onClick={() => requestSort("status")}>
              Status{getSortArrow("status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((cert) => (
              <tr key={cert.id}>
                <td style={styles.td}>{cert.name}</td>
                <td style={styles.td}>{cert.email}</td>
                <td style={styles.td}>{cert.program}</td>
                <td style={styles.td}>{cert.issueDate}</td>
                <td style={styles.td}>{cert.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={styles.noData}>
                No certificates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          style={{ ...styles.button, ...(currentPage === 1 ? styles.buttonDisabled : {}) }}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          style={{ ...styles.button, ...(currentPage === totalPages ? styles.buttonDisabled : {}) }}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CertificateRecords;
