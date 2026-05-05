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
import SearchResults from './pages/SearchResults';
import LatestProducts from './pages/LatestProducts';
import PopularProducts from './pages/PopularProducts';
import FavoriteProducts from './pages/FavoriteProducts';
import SaleProducts from './pages/SaleProducts';
import CustomOrders from './pages/CustomOrders';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import CookiePolicy from './pages/CookiePolicy';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import ShippingInfo from './pages/ShippingInfo';
import Returns from './pages/Returns';
import TrackOrder from './pages/TrackOrder';
import AboutUs from './pages/AboutUs';

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

            {/* Search & Product Pages */}
            <Route
              path="/search"
              element={<SearchResults isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/latest-products"
              element={<LatestProducts isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/popular-products"
              element={<PopularProducts isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/favorite-products"
              element={<FavoriteProducts isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/sale-products"
              element={<SaleProducts isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/custom-orders"
              element={<CustomOrders isAuthenticated={isAuthenticated} />}
            />

            {/* Product Detail & Browse Pages */}
            <Route
              path="/product/:id"
              element={<ProductDetail isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/products"
              element={<Products isAuthenticated={isAuthenticated} />}
            />

            {/* Customer Service Pages */}
            <Route
              path="/faq"
              element={<FAQ />}
            />
            <Route
              path="/shipping-info"
              element={<ShippingInfo />}
            />
            <Route
              path="/returns"
              element={<Returns />}
            />
            <Route
              path="/track-order"
              element={<TrackOrder />}
            />
            <Route
              path="/about-us"
              element={<AboutUs />}
            />

            {/* Footer Pages */}
            <Route
              path="/contact-us"
              element={<ContactUs />}
            />
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="/terms-conditions"
              element={<TermsConditions />}
            />
            <Route
              path="/cookie-policy"
              element={<CookiePolicy />}
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
