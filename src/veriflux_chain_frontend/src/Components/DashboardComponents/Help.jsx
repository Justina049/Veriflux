import React, { useState } from 'react';
import './Help.scss';

const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submission:', formData);
    setSubmitted(true);
  };

  return (
    <div className="help-section">
      <h2>Need Help?</h2>

      <div className="faq">
        <div className="faq-item">
          <h3>🔍 How do I verify my certificate?</h3>
          <p>
            Go to the "My Certificates" section and click on "View PDF". You can also use the certificate hash on the public verification portal.
          </p>
        </div>

        <div className="faq-item">
          <h3>📭 My certificate is missing. What should I do?</h3>
          <p>
            Contact your issuer directly or reach out to our support team using the form below. Make sure you provide the correct email address used during registration.
          </p>
        </div>

        <div className="faq-item">
          <h3>📞 How can I contact support?</h3>
          <p>
            Email us at <a href="mailto:support@veriflux.ng">support@veriflux.ng</a> or use the form below.
          </p>
        </div>
      </div>

      <div className="contact-form">
        <h3>📝 Contact Support</h3>
        {submitted ? (
          <p className="success-msg">✅ Thank you! We'll get back to you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Describe your issue..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Help;
