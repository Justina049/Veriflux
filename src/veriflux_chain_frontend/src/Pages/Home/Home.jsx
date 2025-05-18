// import React, { useEffect } from "react";
// import "./home.css";
// import img2 from "../../Images/bl1.jpg";
// import navLogo from "../../Images/bl1.jpg";
// import { FaCertificate, FaCheckCircle, FaShieldAlt, FaGlobe, FaLock, FaDatabase, FaExpand, FaExclamationTriangle, FaClock } from "react-icons/fa";
// import { GrCertificate } from "react-icons/gr";
// import { MdOutlineSecurity } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import TeamSection from "../../Components/TeamSection/TeamSection";
// import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";


 

// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleSmoothScroll = (event) => {
//       event.preventDefault();
//       const targetId = event.currentTarget.getAttribute("href").substring(1);
//       const targetElement = document.getElementById(targetId);

//       if (targetElement) {
//         window.scrollTo({
//           top: targetElement.offsetTop - 80, 
//           behavior: "smooth",
//         });
//       }
//     };

//     const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
//     navLinks.forEach((link) => link.addEventListener("click", handleSmoothScroll));

//     return () => {
//       navLinks.forEach((link) => link.removeEventListener("click", handleSmoothScroll));
//     };
//   }, []);

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar">
//         {/* 1️⃣ Logo Section */}
//         <div className="logo-container">
//           <img src={navLogo} alt="VeriFlux Logo" className="logo-img" />
//           <span className="logo-text">VeriFlux Chain</span>
//         </div>

//         {/* 2️⃣ Navigation Links (Smooth Scroll) */}
//         <ul className="nav-links">
//           <li><a href="#home">Home</a></li>
//           <li><a href="#features">Features</a></li>
//           <li><a href="#about">About Us</a></li>
//           <li><a href="#benefits">Benefits</a></li>
//         </ul>

//         {/* 3️⃣ Contact Us & Login (Navigate to Pages) */}
//         <div className="auth-buttons">
//           <Link to="/contact-us" className="contact-btn">Contact Us</Link>
//           <button className="login-btn" onClick={() => navigate("/login")}>Login/Register</button>
//           {/* <button className="go-to-app" onClick={() => navigate('/dashboard')}>Dashboard</button> */}

//         </div>
//       </nav>


//     <section id="home">
//     <div className="hero-container" >
//     {/* Left Side Content */}
//     <div className="hero-text">
//       <h1 className="hero-title">
//         Authenticate & Verify Certificates <span>Seamlessly</span>
//       </h1>
//       <p className="hero-description">
//         A decentralized solution ensuring trust, security, and transparency in certificate verification.
//       </p>
//       <div className="hero-actions">
//         <button className="hero-button primary">Get Started</button>
//         <button className="hero-button secondary">Learn More</button>
//       </div>
//       <div className="hero-metrics">
//         <div className="metric-item">
//           <FaCheckCircle className="metric-icon" size={20} color="green"/>
//           <span>100% Tamper-Proof</span>
//         </div>
//         <div className="metric-item">
//           <FaGlobe className="metric-icon" size={20} color="green" />
//           <span>Global Verification</span>
//         </div>
//         <div className="metric-item">
//           <FaLock className="metric-icon" size={20} color="green" />
//           <span>Secure & Private</span>
//         </div>
//       </div>
//     </div>

//     {/* Right Side Image */}
//     <div className="hero-image">
//       <img src={img2} alt="Secure Certificate Verification" />
//     </div>
//   </div>
// {/* </section> */}
//     </section>
  
      
// {/* Key Features Section */}
// <section id="features" className="key-features-section">
//   <h2 className="key-features-title">Key Features of VeriFlux Chain</h2>
//   <p className="key-features-description">
//     VeriFlux Chain allows you to mint and verify certificates securely with a seamless and efficient process.
//   </p>

//   <div className="features-grid">
//     {/* Feature 1 - Mint Certificates */}
//     <div className="feature-item">
//       {/* <img src="mint-icon.png" alt="Minting Icon" className="feature-icon" /> */}
//       <GrCertificate className="feature-icon" size={40} color="#007bff" />
//       <h3>Mint Certificates</h3>
//       <p>Issue tamper-proof certificates with a unique cryptographic hash, ensuring authenticity.</p>
//     </div>

//     {/* Feature 2 - Secure Verification */}
//     <div className="feature-item">
//       {/* <FaCertificate className="feature-icon" size={40} color="#007bff" /> */}
//       <FaCheckCircle className="feature-icon" size={40} color="green" />
//       <h3>Instant Verification</h3>
//       <p>Verify certificate authenticity instantly on the blockchain with real-time validation.</p>
//     </div>

//     {/* Feature 3 - Fraud Prevention */}
//     <div className="feature-item">
//       {/* <img src="fraud-icon.png" alt="Fraud Prevention Icon" className="feature-icon" /> */}
//       <FaExclamationTriangle className="feature-icon" size={40} color="red" />
//       <h3>Fraud Prevention</h3>
//       <p>Eliminate fake credentials by ensuring all issued certificates are immutable and verifiable.</p>
//     </div>

//     {/* Feature 4 - Transparent Recordkeeping */}
//     <div className="feature-item">
//       {/* <img src="transparency-icon.png" alt="Transparency Icon" className="feature-icon" /> */}
//       <FaDatabase className="feature-icon" size={40} color="orange" />
//       <h3>Transparent Recordkeeping</h3>
//       <p>Maintain a decentralized, tamper-proof certificate registry accessible to institutions and verifiers.</p>
//     </div>
//   </div>
// </section>


// {/* About VeriFlux Chain */}
// <section id="about" className="about-section">
//   <div className="about-container">
//     <div className="about-content">
//       <h2 className="about-title">About VeriFlux Chain</h2>

//       <p className="about-description">
//         VeriFlux Chain is a decentralized certificate verification system designed 
//         to eliminate fraud, enhance trust, and streamline authentication processes 
//         using cutting-edge blockchain technology.
//       </p>

//       <div className="about-cards">
//         {/* Mission Card */}
//         <div className="about-card">
//           <h3 className="about-card-title">Our Mission</h3>
//           <p className="about-card-text">
//             Our mission is to provide a secure and verifiable solution for institutions, 
//             employers, and individuals to validate credentials with confidence.
//           </p>
//         </div>

//         {/* Vision Card */}
//         <div className="about-card">
//           <h3 className="about-card-title">Our Vision</h3>
//           <p className="about-card-text">
//             We envision a future where academic and professional achievements are 
//             authenticated seamlessly, reducing fraudulent claims and increasing transparency.
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>


//       {/* Why Choose VeriFlux Chain */}
// <section id="benefits" className="why-veriflux-section">
//   <h2 className="why-veriflux-title">Why Choose VeriFlux Chain?</h2>
//   <p className="why-veriflux-description">
//     VeriFlux Chain revolutionizes certificate verification with a secure, 
//     decentralized, and fraud-resistant platform.
//   </p>

//   <div className="why-veriflux-container">
//     {/* Advanced Security */}
//     <div className="why-veriflux-card">
//       {/* <img src="secure-icon.png" alt="Security Icon" className="why-veriflux-icon" /> */}
//       <MdOutlineSecurity className="feature-icon" size={40} color="purple" />
//       <h3>Advanced Security</h3>
//       <p>Utilizes cryptographic hashing and decentralized technology to prevent certificate forgery and unauthorized modifications.</p>
//       <p>Ensures secure document uploads with automatic verification of authenticity.</p>
//     </div>

//     {/* Global Accessibility */}
//     <div className="why-veriflux-card">
//       {/* <img src="global-icon.png" alt="Global Icon" className="why-veriflux-icon" /> */}
//       <FaGlobe className="feature-icon" size={40} color="blue" />
//       <h3>Global Accessibility</h3>
//       <p>Verify certificates instantly from anywhere in the world with seamless online access.</p>
//       <p>Real-time tracking enables users to monitor the status of certificate submissions effortlessly.</p>
//     </div>

//     {/* Immutable Records */}
//     <div className="why-veriflux-card">
//       {/* <img src="immutable-icon.png" alt="Immutable Records Icon" className="why-veriflux-icon" /> */}
//       <FaClock className="feature-icon" size={40} color="black" />
//       <h3>Immutable Records</h3>
//       <p>All certificates are permanently recorded on a tamper-proof decentralized ledger, ensuring long-term validity.</p>
//       <p>Institutions can easily issue certificates with verifiable details, enhancing trust and transparency.</p>
//     </div>

//     {/* Decentralized & Scalable */}
//     <div className="why-veriflux-card">
//       {/* <img src="scalable-icon.png" alt="Scalability Icon" className="why-veriflux-icon" /> */}
//       <FaExpand className="feature-icon" size={40} color="teal" />
//       <h3>Decentralized & Scalable</h3>
//       <p>Built on the Internet Computer (ICP), offering high reliability, efficiency, and scalability for seamless verification.</p>
//       <p>Designed to accommodate a growing number of users without compromising performance.</p>
//     </div>
//   </div>
// </section>


// {/* Meet the Team Section */}
// <TeamSection />
     

// <footer className="footer">
//       <div className="footer-container">
//         {/* Logo & About */}
//         <div className="footer-section brand-section">
//           <img src={img2} alt="VeriFlux Chain Logo" className="footer-logo" />
//           <span className="brand-text">VeriFlux Chain</span>
//         </div>

//         {/* Navigation Links */}
//         <div className="footer-section">
//           <h3>Quick Links</h3>
//           <ul>
//             <li><a href="/features">Features</a></li>
//             <li><a href="/about">About Us</a></li>
//             <li><a href="/contact">Contact</a></li>
//             <li><a href="/login">Login/Register</a></li>
//           </ul>
//         </div>

//         {/* Subscribe Section */}
//         <div className="footer-section">
//           <h3>Subscribe</h3>
//           <p>Stay updated with the latest news and updates.</p>
//           <div className="subscribe-box">
//             <input type="email" placeholder="Enter your email" className="email-input" />
//             <button className="subscribe-button">Subscribe</button>
//           </div>
//         </div>

//         {/* Social Media */}
//         <div className="footer-section">
//           <h3>Connect With Us</h3>
//           <div className="footer-icons">
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <FaTwitter className="icon" />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//               <FaLinkedin className="icon" />
//             </a>
//             <a href="mailto:info@verifluxchain.com">
//               <FaEnvelope className="icon" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="footer-bottom">
//         <p>© {new Date().getFullYear()} VeriFlux Chain. All Rights Reserved.</p>
//       </div>
//     </footer>
  
//     </div>
//   );
// };

// export default Home;






import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/HeroSection/HeroSection";
import Features from "../../Components/Features/Features";
import WhyUs from "../../Components/WhyUS/WhyUs";
import Plan from "../../Components/Plans/Plan";
import Testimonials from "../../Components/Testimonials/Testimonials";
import CTA from "../../Components/CTA/CTA";
import Footer from "../../Components/Footer/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <WhyUs />
      <Plan />
      <Testimonials />
      <CTA /> 
      <Footer />
    </div>
  );
};

export default HomePage;
