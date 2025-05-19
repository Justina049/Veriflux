import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./TeamSection.scss";
import logo from "../../Images/bl1.jpg"; 
import img from '../../Images/mahila.png'

const teamMembers = [
  {
    name: "John Smith",
    role: "Marketing Manager",
    image: img,
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Emily Davis",
    role: "Software Engineer",
    image: logo,
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Michael Clark",
    role: "Product Designer",
    image: img,
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Sophia Johnson",
    role: "Sales Executive",
    image: logo,
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Miki Brown",
    role: "Operations Manager",
    image: logo,
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Olivia Green",
    role: "UI/UX Designer",
    image: img,
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Liam White",
    role: "Technical Lead",
    image: logo,
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
];

const TeamSection = () => {
  return (
    <section className="team-section">
      <h2 className="team-title">Meet Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <div className="team-social">
              <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
