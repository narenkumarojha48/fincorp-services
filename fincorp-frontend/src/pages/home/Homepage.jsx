import React from 'react'
import { useAppContext } from '../../contexts/app-context';
import BankPartners from '../../components/bankpartner/BankPartners';
import Hero from '../../components/hero/Hero';
import WhatsappChat from '../../components/whatsappbutton/WhatsappChat';
import CallButton from '../../components/callbutton/CallButton';
import "./homepage.css";
// import BankLogos from "../components/BankLogos";

const Homepage = () => {
  const { visitorCount } = useAppContext()

  return (
    <div className="home">

      {/* HERO SECTION */}
       <Hero/>

      <section className="visitor-count-section my-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 text-center shadow-lg">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
            Visitor counter
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {visitorCount.toLocaleString()} users have visited our website
          </p>
          <p className="mt-2 text-sm text-slate-600">
            This count is tracked locally per browser session.
          </p>
        </div>
      </section>

      {/* <section className="hero">
        <div className="hero-content">
          <h1>Fast & Easy Loan Approval</h1>

          <p>
            Authorized Direct Selling Agent for leading banks. 
            Get Home Loans, Personal Loans, Business Loans with quick approval.
          </p>

          <button className="apply-btn">Apply for Loan</button>
        </div>
      </section> */}


      {/* SERVICES */}
      <section className="services">

        <h2>Our Loan Services</h2>

        <div className="service-grid">

          <div className="service-card">
            <h3>Home Loan</h3>
            <p>Get best interest rates from top banks.</p>
          </div>

          <div className="service-card">
            <h3>Personal Loan</h3>
            <p>Instant personal loans with minimal documentation.</p>
          </div>

          <div className="service-card">
            <h3>Business Loan</h3>
            <p>Expand your business with flexible loan options.</p>
          </div>

          <div className="service-card">
            <h3>Loan Against Property</h3>
            <p>Unlock property value with secured loans.</p>
          </div>

        </div>

      </section>


      {/* PARTNER BANKS */}
      <section className="banks">

        <h2>Our Banking Partners</h2>

        {/* <BankPartners /> */}

      </section>


      {/* WHY CHOOSE US */}
      <section className="why-us">

        <h2>Why Choose Us</h2>

        <div className="why-grid">

          <div>
            <h3>✔ Trusted DSA</h3>
            <p>Authorized Direct Selling Agent for multiple banks.</p>
          </div>

          <div>
            <h3>✔ Quick Approval</h3>
            <p>Fast processing and quick loan approvals.</p>
          </div>

          <div>
            <h3>✔ Expert Guidance</h3>
            <p>Loan experts guide you through the entire process.</p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta">

        <h2>Need a Loan? Apply Today</h2>

        <button className="apply-btn">Apply Now</button>

      </section>
       <CallButton/>
       <WhatsappChat/>
    </div>
  );
};

export default Homepage;