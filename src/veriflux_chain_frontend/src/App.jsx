import { useState } from 'react';
import { veriflux_chain_backend } from 'declarations/veriflux_chain_backend';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import IssueCertificate from "./Components/IssueCertificate/IssueCertificate";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import VerifyCertificate from "./Components/VerifyCertificate/VerifyCertificate";
import CertificateList from "./Components/CertificateList/CertificateList"
import "./styles/global.scss";
import ContactUs from './Components/ContactUs/ContactUs';


function App() {

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
    </div>
  );
};


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/issue" element={<IssueCertificate />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/list-certificate" element={<CertificateList />} />
        <Route path="/contact-us" element={<ContactUs />} />

      </Routes>
    </Router>
  );
}

export default App;










