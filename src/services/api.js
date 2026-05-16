import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({ baseURL: API_BASE });

// Attach JWT to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 ONLY for authenticated requests
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Only redirect if user had a token (was authenticated)
      const token = localStorage.getItem('authToken');
      if (token) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),

  sendRegistrationOtp: (data) =>
    api.post('/auth/send-registration-otp', data),

  verifyRegistrationOtp: (data) =>
    api.post('/auth/verify-registration-otp', data),

  logout: () => api.post('/auth/logout'),
};

export const productApi = {
  list: (page = 0, size = 20) => api.get(`/products?page=${page}&size=${size}`),
  search: (q, page = 0) => api.get(`/products/search?q=${q}&page=${page}`),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  uploadImage: (id, file, primary = false) => {
    const form = new FormData();
    form.append('file', file);
    form.append('primary', primary);
    return api.post(`/products/${id}/images`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export const cartApi = {
  get: () => api.get('/cart'),
  addItem: (productId, qty) => api.post('/cart/items', { productId, quantity: qty }),
  updateItem: (itemId, qty) => api.put(`/cart/items/${itemId}`, { quantity: qty }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
};

export const orderApi = {
  place: (data) => api.post('/orders', data),
  list: (page = 0) => api.get(`/orders?page=${page}`),
  getById: (id) => api.get(`/orders/${id}`),
};

export const categoryApi = {
  list: () => api.get('/categories'),
};

export const wishlistApi = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post(`/wishlist/${productId}`),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

export const userApi = {
  me: () => api.get('/user/me'),
  updateMe: (data) => api.put('/user/me', data),
};

const apiService = {
  auth: authApi,
  products: productApi,
  cart: cartApi,
  order: orderApi,
  category: categoryApi,
  wishlist: wishlistApi,
  api,
};

export default apiService;
