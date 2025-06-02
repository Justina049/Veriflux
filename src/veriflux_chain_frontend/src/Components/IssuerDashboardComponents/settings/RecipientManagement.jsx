import React, { useState } from 'react';
import './RecipientManagement.scss';

const RecipientManagement = () => {
  const [recipients, setRecipients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: '',
    status: 'Pending',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRecipient = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.program) {
      setError('All fields are required');
      return;
    }

    const newRecipient = {
      id: Date.now(),
      ...formData,
    };

    setRecipients([newRecipient, ...recipients]);
    setFormData({
      name: '',
      email: '',
      program: '',
      status: 'Pending',
    });
    setError('');
  };

  const handleStatusChange = (id, status) => {
    setRecipients(
      recipients.map((recipient) =>
        recipient.id === id ? { ...recipient, status } : recipient
      )
    );
  };

  const handleDelete = (id) => {
    setRecipients(recipients.filter((r) => r.id !== id));
  };

  return (
    <div className="recipient-management">
      <h2>Recipient Management</h2>

      <form className="recipient-form" onSubmit={handleAddRecipient}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Recipient Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Recipient Email"
        />
        <input
          type="text"
          name="program"
          value={formData.program}
          onChange={handleChange}
          placeholder="Program"
        />
        <button type="submit">Add Recipient</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="recipient-list">
        {recipients.length === 0 ? (
          <p>No recipients added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td>{recipient.name}</td>
                  <td>{recipient.email}</td>
                  <td>{recipient.program}</td>
                  <td>
                    <select
                      value={recipient.status}
                      onChange={(e) =>
                        handleStatusChange(recipient.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Issued">Issued</option>
                      <option value="Revoked">Revoked</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(recipient.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecipientManagement;
