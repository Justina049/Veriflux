import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="veriflux-footer">
      <div className="footer-top">
        <div className="footer-section brand">
          <h3>Veriflux</h3>
          <p>Reliable certificate verification on the blockchain.</p>
          <p>Plot 123, Blockchain Street<br />Lagos, Nigeria</p>
          <p><strong>Phone:</strong> +234 800 123 4567</p>
          <p><strong>Email:</strong> support@veriflux.io</p>
          <div className="social-icons">
            <FaXTwitter />
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>

        <div className="footer-section links">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/plans">Pricing</a></li>
            <li><a href="/verify">Verify</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/terms">Terms</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to get updates about new features & plans.</p>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <strong>Veriflux</strong>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
