import React from 'react';
import Navbar from '.././../Components/Navbar/Navbar';
import Footer from '.././../Components/Footer/Footer';
import MissionVision from '.././../Components/MissionVision/MissionVision';
import Values from '.././../Components/Values/Values';
import TeamSection from '.././../Components/TeamSection/TeamSection';
// import './AboutUs.scss'; 

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <main className="about-page">
        <MissionVision />
        <Values />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
