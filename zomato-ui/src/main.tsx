import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppContextProvider } from './contexts/appContext.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <AppContextProvider>
      <Toaster position="top-left" />
      <App />
    </AppContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
