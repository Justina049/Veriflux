// import { useEffect, useState } from "react";
// import { initAuth, login, logout, getPrincipal } from "../../auth/identity";
// import { NavLink, useNavigate } from "react-router-dom";
// import bgImage from "../../Images/pexels-rostislav-5011647.jpg";
// import "./LandingPage.scss";


// const LandingPage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const setup = async () => {
//       await initAuth();
//       const principal = getPrincipal();
//       if (principal) {
//         setUser(principal);
//       }
//     };
//     setup();
//   }, []);

//   const handleLogin = async () => {
//     await login(); 
//   };

//   return (
//     <div className="landing-page">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">VeriFlux</div>

//         <ul className="nav-links">
//           <li>
//             <NavLink to="/issue" className={({ isActive }) => (isActive ? "active" : "")}>
//               Issue Certificate
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/verify" className={({ isActive }) => (isActive ? "active" : "")}>
//               Verify Certificate
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/list-certificate" className={({ isActive }) => (isActive ? "active" : "")}>
//               List Certificates
//             </NavLink>
//           </li>
//         </ul>

//         {
//           user ? (
//             <button className="cta-nav" onClick={() => navigate("/login")}>
//           Go to App
//         </button>

//           ) : (
//             <button className="cta-nav" onClick={handleLogin}>
//               Login with Internet Identity
//             </button>
//           )
//         }   
//       </nav>

//       {/* Hero Section */}
//       <div className="hero-section"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <div className="hero-content">
//           <h1>Secure & Decentralized Certificate Verification</h1>
//           <p>
//             VeriFlux ensures authenticity and trust using blockchain technology.
//           </p>

//           {
//             user ? (
//               <button className="get-started" onClick={() => navigate("/home")}>
//                 Go to App
//               </button>
//             ) : (
//               <button className="get-started" onClick={handleLogin}>
//                 Login with Internet Identity
//               </button>
//             )
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bgImage from "../../Images/pexels-rostislav-5011647.jpg";
import { initAuth, login, getPrincipal } from "../../auth/identity";
import "./LandingPage.scss";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    initAuth().then(() => {
      const principal = getPrincipal();
      if (principal) setUser(principal);
    });
  }, []);

  const handleLogin = () => {
    login(() => {
      const principal = getPrincipal();
      if (principal) {
        setUser(principal);
        navigate("/home"); // ✅ redirect after login
      }
    });
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">VeriFlux</div>

        <ul className="nav-links">
          <li>
            <NavLink to="/issue">Issue Certificate</NavLink>
          </li>
          <li>
            <NavLink to="/verify">Verify Certificate</NavLink>
          </li>
          <li>
            <NavLink to="/list-certificate">List Certificates</NavLink>
          </li>
        </ul>

        <button className="cta-nav" onClick={() => login((principal) => {
          setUser(principal);
          navigate("/home");
        })}>
            Go to App
        </button>

      </nav>

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <h1>Secure & Decentralized Certificate Verification</h1>
          <p>
            VeriFlux ensures authenticity and trust using blockchain technology.
          </p>
          <button className="get-started" onClick={() => login((principal) => {
            setUser(principal);
            navigate("/home");
          })}>
            Get Started
          </button>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
