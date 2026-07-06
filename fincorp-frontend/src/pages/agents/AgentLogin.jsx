import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAgent } from "../../contexts/agent-context";
import "./agent-login.css";

export default function AgentLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agentLogin, isAgentAuth } = useAgent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registered = location.state?.registered;

  useEffect(() => {
    if (isAgentAuth) navigate("/agent/dashboard", { replace: true });
  }, [isAgentAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await agentLogin(email, password);
      navigate("/agent/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Agent Login</h1>
          <p>Sign in to your FinCorp partner dashboard</p>
        </div>

        {registered && (
          <div className="alert alert-success">
            Registration successful! Please login with your credentials.
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="register-link-text">
          Not registered? <Link to="/agent/register">Become a partner</Link>
        </p>
      </div>
    </div>
  );
}
