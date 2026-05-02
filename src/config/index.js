/**
 * Centralized Configuration Module
 * 
 * This file serves as the single source of truth for all environment variables
 * and configuration constants used throughout the application.
 * 
 * Benefits:
 * - Single source of truth for API URL
 * - Easy to override for different environments
 * - Type-safe configuration
 * - Easy to extend with new config values
 */

const config = {
  // API Configuration
  api: {
    // Base URL for backend API
    // Read from environment variable with fallback
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',

    // Request timeout in milliseconds
    timeout: 30000,

    // Default headers
    headers: {
      'Content-Type': 'application/json',
    },
  },

  // Authentication Configuration
  auth: {
    // Local storage key for JWT token
    tokenKey: 'auth_token',

    // Local storage key for user data
    userKey: 'user_data',

    // Token expiry warning (in milliseconds)
    // Warn user when token expires in less than this time
    expiryWarning: 5 * 60 * 1000, // 5 minutes
  },

  // Application Configuration
  app: {
    name: 'Infinite Prints',
    version: '1.0.0',
  },

  // Feature Flags (useful for gradual rollout)
  features: {
    enableAnalytics: true,
    enableErrorTracking: false,
  },
};

// Validate critical configuration
if (!config.api.baseURL) {
  console.warn(
    '⚠️ REACT_APP_API_URL is not set. Using fallback: ' + config.api.baseURL
  );
}

export default config;
