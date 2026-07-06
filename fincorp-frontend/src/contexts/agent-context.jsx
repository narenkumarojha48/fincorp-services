import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../config";

const AgentContext = createContext(null);

export function AgentProvider({ children }) {
  const [agent, setAgent] = useState(null);
  const [isAgentAuth, setIsAgentAuth] = useState(false);
  const [agentLoading, setAgentLoading] = useState(true);

  const fetchAgent = useCallback(async () => {
    try {
      const token = localStorage.getItem("agent_token");
      if (!token) {
        setAgentLoading(false);
        return;
      }
      const { data } = await axios.get(`${config.apiUrl}/agent/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.agent) {
        setAgent(data.agent);
        setIsAgentAuth(true);
      }
    } catch {
      localStorage.removeItem("agent_token");
    } finally {
      setAgentLoading(false);
    }
  }, []);

  useEffect(() => { fetchAgent(); }, [fetchAgent]);

  const agentLogin = async (email, password) => {
    const { data } = await axios.post(`${config.apiUrl}/agent/login`, { email, password });
    localStorage.setItem("agent_token", data.token);
    setAgent(data.agent);
    setIsAgentAuth(true);
    return data;
  };

  const agentLogout = () => {
    localStorage.removeItem("agent_token");
    setAgent(null);
    setIsAgentAuth(false);
  };

  return (
    <AgentContext.Provider value={{ agent, isAgentAuth, agentLoading, agentLogin, agentLogout, setAgent, setIsAgentAuth }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used within AgentProvider");
  return ctx;
}
