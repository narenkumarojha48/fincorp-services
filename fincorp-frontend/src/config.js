// src/config.js

const config = {
  // Backend API URL
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  
  // Upload service URL
  uploadApiUrl: import.meta.env.VITE_UPLOAD_API_URL || 'http://localhost:5001/api/v1',
  
  // Google Auth
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  
  // Feature Flags (useful for DSA app roles)
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // App Constants
  appName: 'FinCorpServices',
  supportEmail: 'support@fincorp.com',
};

export default config;