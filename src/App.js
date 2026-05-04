import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/dashboard/Cart';
import Wishlist from './pages/dashboard/Wishlist';
import CustomerCare from './pages/dashboard/CustomerCare';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard user={user} isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/" /> : <Register onRegisterSuccess={handleLoginSuccess} />} 
            />
            <Route 
              path="/cart" 
              element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/wishlist" 
              element={isAuthenticated ? <Wishlist /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/customer-care" 
              element={<CustomerCare />} 
            />
            
            {/* Catch-all route */}
            <Route 
              path="*" 
              element={<Navigate to="/" />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
