// import React, { useState } from 'react';
// import './CertificateTemplates.scss';

// const CertificateTemplates = () => {
//   const [templates, setTemplates] = useState([
//     { id: 1, name: 'Graduation Certificate', updated: '2025-05-01' },
//     { id: 2, name: 'Training Completion', updated: '2025-04-15' },
//   ]);

//   return (
//     <div className="templates-container">
//       <h2>Certificate Templates</h2>

//       <div className="template-actions">
//         <button className="btn-upload">Upload New Template</button>
//       </div>

//       <div className="templates-list">
//         {templates.length === 0 ? (
//           <p>No templates found.</p>
//         ) : (
//           templates.map((template) => (
//             <div key={template.id} className="template-card">
//               <h3>{template.name}</h3>
//               <p>Last updated: {template.updated}</p>
//               <div className="template-buttons">
//                 <button>Edit</button>
//                 <button className="delete">Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CertificateTemplates;



import React, { useState } from 'react';
import './CertificateTemplates.scss';

const CertificateTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = (e) => {
    setUpload(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!templateName || !upload) {
      setError('Please provide a name and select a template file.');
      return;
    }

    const newTemplate = {
      id: Date.now(),
      name: templateName,
      filename: upload.name,
    };

    setTemplates([newTemplate, ...templates]);
    setTemplateName('');
    setUpload(null);
    setError('');
  };

  const handleDelete = (id) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  return (
    <div className="certificate-templates">
      <h2>Certificate Templates</h2>
      <form onSubmit={handleSubmit} className="template-form">
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Template Name"
        />
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={handleUpload}
        />
        <button type="submit">Upload Template</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="template-list">
        {templates.length === 0 ? (
          <p>No templates uploaded yet.</p>
        ) : (
          <ul>
            {templates.map((template) => (
              <li key={template.id}>
                <div>
                  <strong>{template.name}</strong>
                  <span>{template.filename}</span>
                </div>
                <button onClick={() => handleDelete(template.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CertificateTemplates;
