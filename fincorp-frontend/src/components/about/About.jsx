import React from 'react'
import BankPartners from '../bankpartner/BankPartners';
import './About.css'
const About = () => {
  return (
    <section className="about-section">

      <div className="about-container">

        <h1 className="about-title">About FincorpServices</h1>

        <p className="about-description">
          FincorpServices is an authorized Direct Selling Agent (DSA) working
          with leading banks and financial institutions. Our mission is to make
          the loan process simple, transparent, and fast for individuals and
          businesses.
        </p>

        <p className="about-description">
          We help customers compare loan options, understand eligibility
          requirements, and submit applications to trusted lenders. Our expert
          team guides customers at every step to ensure smooth processing and
          quick approvals.
        </p>

        <div className="about-features">

          <div className="feature-card">
            <h3>🏦 Trusted Bank Partners</h3>
            <p>
              We work with reputed banks and NBFCs to provide reliable loan
              options to our customers.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast Loan Processing</h3>
            <p>
              Our streamlined process helps customers receive faster approvals
              and minimal paperwork.
            </p>
          </div>

          <div className="feature-card">
            <h3>💼 Expert Financial Guidance</h3>
            <p>
              Our experienced advisors help you choose the best loan products
              based on your financial needs.
            </p>
          </div>

        </div>
        <BankPartners/>

        <div className="about-disclaimer">
          <p>
            Disclaimer: FincorpServices acts as an authorized Direct Selling
            Agent. Loan approval, interest rates, and terms are determined
            solely by the respective banks or financial institutions.
          </p>
        </div>
         
      </div>

    </section>
  );
};

export default About;