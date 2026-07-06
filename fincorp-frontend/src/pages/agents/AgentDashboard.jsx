import { useAgent } from "../../contexts/agent-context";
import "./agent-dashboard.css";

const stats = [
  { label: "Total Leads", value: "24", icon: "📋", change: "+12% this month" },
  { label: "Applications", value: "18", icon: "📄", change: "8 pending" },
  { label: "Approved", value: "6", icon: "✅", change: "33% approval rate" },
  { label: "Commission Earned", value: "₹42,500", icon: "💰", change: "This quarter" },
];

const recentLeads = [
  { id: "#L-1024", name: "Rahul Sharma", loan: "Home Loan", amount: "₹25L", status: "New", date: "06 Jul 2026" },
  { id: "#L-1023", name: "Priya Patel", loan: "Personal Loan", amount: "₹5L", status: "Contacted", date: "05 Jul 2026" },
  { id: "#L-1022", name: "Amit Singh", loan: "Business Loan", amount: "₹15L", status: "Docs Submitted", date: "04 Jul 2026" },
  { id: "#L-1021", name: "Sneha Gupta", loan: "Loan Against Property", amount: "₹50L", status: "Approved", date: "03 Jul 2026" },
];

export default function AgentDashboard() {
  const { agent } = useAgent();

  return (
    <div className="agent-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {agent?.name || "Agent"}</h1>
          <p>Here is your performance overview</p>
        </div>
        <button className="btn-add-lead">+ Add New Lead</button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <div>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-change">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Leads</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        <div className="table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Customer</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.name}</td>
                  <td>{lead.loan}</td>
                  <td>{lead.amount}</td>
                  <td><span className={`status-badge status-${lead.status.toLowerCase().replace(/\s+/g, "-")}`}>{lead.status}</span></td>
                  <td>{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <span className="action-icon">📝</span>
            <h3>Submit Application</h3>
            <p>Submit a new loan application for a customer</p>
          </div>
          <div className="action-card">
            <span className="action-icon">📎</span>
            <h3>Upload Documents</h3>
            <p>Upload customer KYC documents</p>
          </div>
          <div className="action-card">
            <span className="action-icon">📊</span>
            <h3>Track Status</h3>
            <p>Check application status for existing leads</p>
          </div>
          <div className="action-card">
            <span className="action-icon">📞</span>
            <h3>Contact Support</h3>
            <p>Reach out to your relationship manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
