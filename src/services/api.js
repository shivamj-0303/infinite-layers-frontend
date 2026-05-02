/**
 * API Service Module
 * 
 * Centralized Axios instance and API methods
 * 
 * This module:
 * - Creates a single Axios instance with shared configuration
 * - Provides clean API methods for all endpoints
 * - Handles common error patterns
 * - Manages authentication headers automatically
 * - Can be easily extended for new endpoints
 * 
 * Usage:
 * import apiService from '@/services/api';
 * apiService.login(email, password)
 * apiService.register(userData)
 */

import axios from 'axios';
import config from '../config';

// Create Axios instance with centralized configuration
const apiInstance = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: config.api.headers,
});

/**
 * Request Interceptor
 * Automatically add JWT token to all requests
 */
apiInstance.interceptors.request.use(
  (requestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem(config.auth.tokenKey);

    // Add Authorization header if token exists
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle common error patterns and token expiry
 */
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401) {
      // Clear authentication
      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.userKey);

      // Optionally: redirect to login
      // window.location.href = '/login';

      console.warn('🔐 Authentication expired. Please login again.');
    }

    // Handle 403 Forbidden (insufficient permissions)
    if (error.response?.status === 403) {
      console.warn('🚫 You do not have permission to access this resource.');
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('🔥 Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

/**
 * API Service Object
 * Contains all API endpoint methods
 * Organized by feature (auth, products, orders, etc.)
 */
const apiService = {
  /**
   * Authentication Endpoints
   */
  auth: {
    /**
     * User login
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Response with JWT token
     */
    login: (email, password) =>
      apiInstance.post('/auth/login', { email, password }),

    /**
     * User registration
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {string} firstName - User first name
     * @param {string} lastName - User last name
     * @returns {Promise} Response with JWT token
     */
    register: (email, password, firstName, lastName) =>
      apiInstance.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
      }),

    /**
     * Refresh JWT token
     * @returns {Promise} Response with new token
     */
    refreshToken: () => apiInstance.post('/auth/refresh-token'),

    /**
     * Logout (optional - mainly for clearing frontend state)
     * @returns {Promise}
     */
    logout: () => {
      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.userKey);
      return Promise.resolve();
    },
  },

  /**
   * User Endpoints (placeholder for future development)
   */
  user: {
    /**
     * Get current user profile
     * @returns {Promise} Current user data
     */
    getProfile: () => apiInstance.get('/user/profile'),

    /**
     * Update user profile
     * @param {object} profileData - Updated profile data
     * @returns {Promise} Updated user data
     */
    updateProfile: (profileData) =>
      apiInstance.put('/user/profile', profileData),

    /**
     * Change password
     * @param {string} currentPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise} Success response
     */
    changePassword: (currentPassword, newPassword) =>
      apiInstance.post('/user/change-password', {
        currentPassword,
        newPassword,
      }),
  },

  /**
   * Products Endpoints (placeholder for future development)
   */
  products: {
    /**
     * Get all products
     * @param {object} filters - Filter options (limit, offset, search, etc.)
     * @returns {Promise} List of products
     */
    getAll: (filters = {}) => apiInstance.get('/products', { params: filters }),

    /**
     * Get single product
     * @param {string} productId - Product ID
     * @returns {Promise} Product data
     */
    getById: (productId) => apiInstance.get(`/products/${productId}`),
  },

  /**
   * Cart Endpoints (placeholder for future development)
   */
  cart: {
    /**
     * Get user's cart
     * @returns {Promise} Cart items
     */
    getCart: () => apiInstance.get('/cart'),

    /**
     * Add item to cart
     * @param {string} productId - Product ID
     * @param {number} quantity - Quantity to add
     * @returns {Promise} Updated cart
     */
    addItem: (productId, quantity) =>
      apiInstance.post('/cart/add', { productId, quantity }),

    /**
     * Remove item from cart
     * @param {string} productId - Product ID
     * @returns {Promise} Updated cart
     */
    removeItem: (productId) => apiInstance.delete(`/cart/items/${productId}`),

    /**
     * Clear cart
     * @returns {Promise} Success response
     */
    clear: () => apiInstance.delete('/cart'),
  },

  /**
   * Orders Endpoints (placeholder for future development)
   */
  orders: {
    /**
     * Get user's orders
     * @param {object} filters - Filter options
     * @returns {Promise} List of orders
     */
    getMyOrders: (filters = {}) =>
      apiInstance.get('/orders/my-orders', { params: filters }),

    /**
     * Get single order
     * @param {string} orderId - Order ID
     * @returns {Promise} Order data
     */
    getById: (orderId) => apiInstance.get(`/orders/${orderId}`),

    /**
     * Create new order
     * @param {object} orderData - Order details (items, shipping address, etc.)
     * @returns {Promise} Created order
     */
    create: (orderData) => apiInstance.post('/orders', orderData),

    /**
     * Cancel order
     * @param {string} orderId - Order ID
     * @returns {Promise} Updated order
     */
    cancel: (orderId) => apiInstance.post(`/orders/${orderId}/cancel`),
  },
};

export default apiService;
