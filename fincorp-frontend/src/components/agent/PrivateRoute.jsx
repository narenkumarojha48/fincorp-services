import { Navigate, useLocation } from "react-router-dom";
import { useAgent } from "../../contexts/agent-context";

export default function PrivateRoute({ children }) {
  const { isAgentAuth, agentLoading } = useAgent();
  const location = useLocation();

  if (agentLoading) {
    return (
      <div className="agent-loader">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAgentAuth) {
    return <Navigate to="/agent/login" state={{ from: location }} replace />;
  }

  return children;
}
