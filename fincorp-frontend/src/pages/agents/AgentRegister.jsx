import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import "./agent-register.css";

const LOAN_TYPES = ["Home Loan", "Personal Loan", "Business Loan", "Loan Against Property", "All"];
const EXPERIENCE_LEVELS = ["Fresher", "1-2 years", "3-5 years", "5+ years"];

export default function AgentRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "",
    experience: "", loanTypes: [], aadharNumber: "", panNumber: "",
    address: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        loanTypes: checked
          ? [...prev.loanTypes, value]
          : prev.loanTypes.filter((t) => t !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) errs.phone = "Enter 10-digit number";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.experience) errs.experience = "Select experience level";
    if (form.loanTypes.length === 0) errs.loanTypes = "Select at least one";
    if (!form.aadharNumber.trim()) errs.aadharNumber = "Aadhar is required";
    else if (!/^\d{12}$/.test(form.aadharNumber)) errs.aadharNumber = "Enter 12-digit Aadhar";
    if (!form.panNumber.trim()) errs.panNumber = "PAN is required";
    else if (!/[A-Z]{5}[0-9]{4}[A-Z]/.test(form.panNumber)) errs.panNumber = "Invalid PAN format";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "At least 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await axios.post(`${config.apiUrl}/agent/register`, form);
      navigate("/agent/login", { state: { registered: true } });
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Partner with Us</h1>
          <p>Become a FinCorp DSA Agent and earn commissions</p>
        </div>

        {apiError && <div className="alert alert-error">{apiError}</div>}

        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10} />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>City *</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="Your city" />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2} placeholder="Full address" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Experience *</label>
              <select name="experience" value={form.experience} onChange={handleChange}>
                <option value="">Select experience</option>
                {EXPERIENCE_LEVELS.map((lev) => (
                  <option key={lev} value={lev}>{lev}</option>
                ))}
              </select>
              {errors.experience && <span className="field-error">{errors.experience}</span>}
            </div>
            <div className="form-group">
              <label>Loan Types Handled *</label>
              <div className="checkbox-group">
                {LOAN_TYPES.map((lt) => (
                  <label key={lt} className="checkbox-label">
                    <input type="checkbox" name="loanTypes" value={lt} checked={form.loanTypes.includes(lt)} onChange={handleChange} />
                    {lt}
                  </label>
                ))}
              </div>
              {errors.loanTypes && <span className="field-error">{errors.loanTypes}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Aadhar Number *</label>
              <input name="aadharNumber" value={form.aadharNumber} onChange={handleChange} placeholder="12-digit Aadhar number" maxLength={12} />
              {errors.aadharNumber && <span className="field-error">{errors.aadharNumber}</span>}
            </div>
            <div className="form-group">
              <label>PAN Number *</label>
              <input name="panNumber" value={form.panNumber} onChange={handleChange} placeholder="e.g., ABCDE1234F" maxLength={10} style={{ textTransform: "uppercase" }} />
              {errors.panNumber && <span className="field-error">{errors.panNumber}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? "Submitting..." : "Register as Agent"}
          </button>
        </form>

        <p className="login-link-text">
          Already registered? <Link to="/agent/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
