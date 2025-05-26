import React, { useState } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import img from '../../Images/pexels-photo-7709287.webp';
import "./ContactUs.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    setFormData({ fullName: "", email: "", message: "" });
  };

  return (
    <div className="contactSection">  
        <Navbar />
        <div className="contact-wrapper">
        <div className="contact-intro">
            <button className="contact-tag">Contact US</button>
            <h1>
            Let&apos;s <b>work</b> together
            </h1>
            <p>Any question or remark? just write us a message</p>
        </div>

        <div className="contact-container">
            <div className="contact-image-card">
            <img 
                src={img} 
                // alt="People working" 
            />
            <div className="contact-info">
                <div className="info-item">
                <MdEmail className="icon email-icon" />
                <div>
                    <p className="label">Email</p>
                    <p className="value">example@gmail.com</p>
                </div>
                </div>
                <div className="info-item">
                <MdPhone className="icon phone-icon" />
                <div>
                    <p className="label">Phone</p>
                    <p className="value">+1234 568 963</p>
                </div>
                </div>
            </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a message</h3>
            <p>
                If you would like to discuss anything related to payment, account, licensing, partnerships, or have pre-sales questions, you’re at the right place.
            </p>
            <div className="input-row">
                <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                />
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <textarea
                name="message"
                placeholder="Write a message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
            />
            <button type="submit">Send inquiry</button>
            {submitted && <p className="success-msg">Thank you for your message!</p>}
            </form>
        </div>
        </div>
        <Footer />
    </div>
  );
};

export default ContactUs;


