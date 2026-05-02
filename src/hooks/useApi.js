/**
 * Custom Hooks for Common API Patterns
 * 
 * These hooks encapsulate common API usage patterns
 * and can be reused across components.
 * 
 * Usage:
 * const { data, loading, error } = useAuthApi();
 * const { login, register } = useAuth();
 */

import { useState, useCallback } from 'react';
import apiService from '../services/api';
import config from '../config';

/**
 * Hook for authentication operations
 * Handles login, register, logout with automatic state management
 * 
 * @returns {object} { user, token, login, register, logout, loading, error }
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem(config.auth.tokenKey)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Get user from localStorage
  const getUser = useCallback(() => {
    const userData = localStorage.getItem(config.auth.userKey);
    return userData ? JSON.parse(userData) : null;
  }, []);

  // Login
  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.auth.login(email, password);
        const newToken = response.data.token;
        const userData = response.data.user || parseJwt(newToken);

        // Store in localStorage
        localStorage.setItem(config.auth.tokenKey, newToken);
        localStorage.setItem(config.auth.userKey, JSON.stringify(userData));

        // Update state
        setToken(newToken);
        setUser(userData);

        return { token: newToken, user: userData };
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Register
  const register = useCallback(
    async (email, password, firstName, lastName) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.auth.register(
          email,
          password,
          firstName,
          lastName
        );
        const newToken = response.data.token;
        const userData = response.data.user || parseJwt(newToken);

        // Store in localStorage
        localStorage.setItem(config.auth.tokenKey, newToken);
        localStorage.setItem(config.auth.userKey, JSON.stringify(userData));

        // Update state
        setToken(newToken);
        setUser(userData);

        return { token: newToken, user: userData };
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Logout
  const logout = useCallback(async () => {
    try {
      await apiService.auth.logout();
      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.userKey);
      setToken(null);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  return {
    user: user || getUser(),
    token,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
    error,
  };
};

/**
 * Hook for API calls with loading and error states
 * Useful for data fetching
 * 
 * @param {function} apiFunction - API service method (e.g., apiService.products.getAll)
 * @param {array} dependencies - Dependencies for useEffect
 * @returns {object} { data, loading, error, refetch }
 */
export const useApiCall = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(...args);
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || 'Request failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, fetch };
};

/**
 * Hook for managing form state and API submission
 * Handles validation, loading, and error states
 * 
 * @param {object} initialState - Initial form values
 * @param {function} onSubmit - Function to call on form submit
 * @returns {object} { values, errors, loading, handleChange, handleSubmit }
 */
export const useForm = (initialState, onSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await onSubmit(values);
      } catch (err) {
        // Handle validation errors
        if (err.validation) {
          setErrors(err.validation);
        } else {
          setErrors({ submit: err.message || 'An error occurred' });
        }
      } finally {
        setLoading(false);
      }
    },
    [values, onSubmit]
  );

  return {
    values,
    setValues,
    errors,
    setErrors,
    loading,
    handleChange,
    handleSubmit,
  };
};

/**
 * Hook for managing async state (pending/success/error)
 * Useful for complex async operations
 * 
 * @param {function} asyncFunction - Async function to execute
 * @returns {object} { execute, status, data, error, reset }
 */
export const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState('idle'); // idle | pending | success | error
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus('pending');
      setData(null);
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setData(response);
        setStatus('success');
        return response;
      } catch (err) {
        setError(err);
        setStatus('error');
        throw err;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return { execute, status, data, error, reset };
};

/**
 * Simple JWT parser (same as in Login.js)
 * Use only for reading token, NOT for security validation
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default {
  useAuth,
  useApiCall,
  useForm,
  useAsync,
};
