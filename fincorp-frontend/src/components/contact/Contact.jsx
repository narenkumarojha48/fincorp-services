import { useState } from 'react'
import axios from 'axios'
import config from '../../config'
import './Contact.css'

const Contact = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', loanType: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.name || !form.phone || !form.email || !form.message) {
      setError('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      await axios.post(`${config.uploadApiUrl}/contact/submit`, form)
      setSuccess('Your inquiry has been submitted. We will contact you within 24 hours.')
      setForm({ name: '', phone: '', email: '', loanType: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-section">

      <div className="contact-container">

        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">
          Need help with a loan? Our experts are ready to assist you.
        </p>

        {success && <div className="contact-success">{success}</div>}
        {error && <div className="contact-error">{error}</div>}

        <div className="contact-content">

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>

            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required />

            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" required />

            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" required />

            <select name="loanType" value={form.loanType} onChange={handleChange}>
              <option value="">Select Loan Type</option>
              <option>Home Loan</option>
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Loan Against Property</option>
              <option>Car Loan</option>
            </select>

            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message *" required></textarea>

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Submit Inquiry'}
            </button>

          </form>

          {/* Contact Information */}
          <div className="contact-info">

            <h3>Get in Touch</h3>

            <p>📞 +91 99999 99999</p>

            <p>✉ support@fincorpservices.com</p>

            <p>📍 Mumbai, India</p>

            <p className="contact-note">
              Our team will contact you within 24 hours.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Contact;