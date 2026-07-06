import { useAgent } from "../../contexts/agent-context";
import "./agent-profile.css";

export default function AgentProfile() {
  const { agent } = useAgent();

  if (!agent) return null;

  return (
    <div className="agent-profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {agent.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <h1>{agent.name}</h1>
          <p className="profile-role">DSA Partner</p>
          <p className="profile-id">Agent ID: {agent.agentId || agent._id?.slice(-6) || "---"}</p>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h2>Personal Information</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{agent.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{agent.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">City</span>
                <span className="detail-value">{agent.city}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Experience</span>
                <span className="detail-value">{agent.experience || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>KYC Details</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Aadhar Number</span>
                <span className="detail-value">{agent.aadharNumber ? `xxxx-xxxx-${agent.aadharNumber.slice(-4)}` : "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">PAN Number</span>
                <span className="detail-value">{agent.panNumber ? `xxxxx${agent.panNumber.slice(-4)}` : "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">KYC Status</span>
                <span className={`kyc-badge ${agent.kycStatus === "verified" ? "kyc-verified" : agent.kycStatus === "pending" ? "kyc-pending" : "kyc-not-submitted"}`}>
                  {agent.kycStatus || "Not Submitted"}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>Loan Specializations</h2>
            <div className="loan-tags">
              {(agent.loanTypes || ["Home Loan", "Personal Loan"]).map((lt) => (
                <span key={lt} className="loan-tag">{lt}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
