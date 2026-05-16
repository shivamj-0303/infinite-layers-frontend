import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.auth.login(email, password);

      let token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.data?.token;

      if (!token) {
        throw new Error('No token in response');
      }

      // Store token
      localStorage.setItem('authToken', token);

      // Fetch real user profile
      const userResponse = await apiService.user.me();

      const userData = userResponse.data;

      // Store user profile
      localStorage.setItem('user', JSON.stringify(userData));

      // Update auth state
      onLoginSuccess(token, userData);

      setTimeout(() => {
        navigate('/', { replace: true });
      }, 100);

      toast.success('Logged in successfully!');
    } catch (err) {
      console.error('Login error:', err);

      toast.error(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials and try again.'
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials and try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-700 hover:text-pink-500 transition"
        >
          <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Infinite Layers</h1>
            <h2 className="text-2xl font-bold text-gray-900">Login to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500">
                create a new account
              </Link>
            </p>
          </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
