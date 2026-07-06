import { useState } from "react";
import "./hero.css";

const Hero = () => {

  const [formData,setFormData] = useState({
    name:"",
    phone:"",
    loanType:""
  });

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const submitForm = (e)=>{
    e.preventDefault();
    console.log(formData);
    alert("Loan request submitted!");
  };

  return (

    <section className="hero">

      <div className="hero-container">

        {/* LEFT CONTENT */}

        <div className="hero-content">

          <h1>Get Instant Loan Approval</h1>

          <p>
            Apply for Home Loans, Personal Loans, and Business Loans 
            with our trusted banking partners. Quick processing and 
            expert guidance.
          </p>

          <ul>
            <li>✔ Lowest Interest Rates</li>
            <li>✔ Fast Loan Processing</li>
            <li>✔ Trusted Banking Partners</li>
          </ul>

        </div>

        {/* RIGHT FORM */}

        <div className="hero-form">

          <h2>Apply for Loan</h2>

          <form onSubmit={submitForm}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />

            <select
              name="loanType"
              onChange={handleChange}
              required
            >

              <option value="">Select Loan Type</option>
              <option>Home Loan</option>
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Loan Against Property</option>
              <option>Car Loan</option>

            </select>

            <button type="submit">
              Check Eligibility
            </button>

          </form>

        </div>

      </div>

    </section>

  );
};

export default Hero;