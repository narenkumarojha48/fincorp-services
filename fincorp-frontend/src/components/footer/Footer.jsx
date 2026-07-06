import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="dsa-footer">

      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-col">
          <h2 className="footer-logo">
            Fincorp<span>Services</span>
          </h2>

          <p className="footer-text">
            Authorized Direct Selling Agent for leading banks. 
            We simplify your loan process with expert guidance 
            and quick approvals.
          </p>

          <div className="trust-badge">
            RBI Compliant DSA
          </div>
        </div>

        {/* Loan Products */}
        <div className="footer-col">
          <h4>Loan Products</h4>
          <ul className="footer-links">
            <li><a href="#">Home Loan</a></li>
            <li><a href="#">Personal Loan</a></li>
            <li><a href="#">Business Loan</a></li>
            <li><a href="#">Loan Against Property</a></li>
            <li><a href="#">Car Loan</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/dsa-disclosure">DSA Disclosure</a></li>
            <li><a href="/grievance">Grievance</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>

          <div className="contact-item">
            📞 +91 99999 99999
          </div>

          <div className="contact-item">
            ✉ support@fincorpservices.com
          </div>

          <div className="contact-item">
            📍 Mumbai, India
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">

        <p className="compliance-text">
          Disclaimer: We are an authorized Direct Selling Agent (DSA). Loan
          approval is subject to the policies of the respective banks or
          financial institutions. We do not charge customers any upfront
          processing fees.
        </p>

        <p className="copyright">
          © {new Date().getFullYear()} FincorpServices. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;