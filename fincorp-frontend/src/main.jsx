import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContextProvider } from './contexts/app-context.jsx'
import { AgentProvider } from './contexts/agent-context.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import './index.css'
import config from './config.js';
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <AppContextProvider>
        <AgentProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
          <ToastContainer/>
        </AgentProvider>
      </AppContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
