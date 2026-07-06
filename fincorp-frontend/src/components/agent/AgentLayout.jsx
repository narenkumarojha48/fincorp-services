import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAgent } from "../../contexts/agent-context";
import "./agent-layout.css";

export default function AgentLayout() {
  const { agent, agentLogout } = useAgent();
  const navigate = useNavigate();

  const handleLogout = () => {
    agentLogout();
    navigate("/");
  };

  return (
    <div className="agent-layout">
      <aside className="agent-sidebar">
        <div className="sidebar-brand">
          <h2>FinCorp</h2>
          <p>Agent Portal</p>
        </div>
        <div className="sidebar-user">
          <div className="user-avatar-sm">{agent?.name?.charAt(0) || "A"}</div>
          <div>
            <p className="user-name-sm">{agent?.name || "Agent"}</p>
            <p className="user-role-sm">DSA Partner</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/agent/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/agent/profile" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            👤 My Profile
          </NavLink>
          <a href="#" className="sidebar-link">📋 Leads</a>
          <a href="#" className="sidebar-link">📄 Applications</a>
          <a href="#" className="sidebar-link">💰 Commissions</a>
          <a href="#" className="sidebar-link">📎 Upload Docs</a>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout-sidebar">🚪 Logout</button>
        </div>
      </aside>
      <main className="agent-main">
        <Outlet />
      </main>
    </div>
  );
}
