import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-sm md:text-base opacity-90">Get exclusive 3D printing deals and design inspiration</p>
            </div>
            <form onSubmit={handleNewsletterSignup} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Infinite Prints
            </h3>
            <p className="text-sm mb-4">
              Your premier destination for custom 3D printed items - from personalized keychains and lithophanes to unique home decor.
            </p>
            <div className="text-xs text-gray-500">
              <p className="font-semibold text-gray-400 mb-2">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="hover:text-pink-400 transition">Facebook</a>
                <a href="#" className="hover:text-pink-400 transition">Instagram</a>
                <a href="#" className="hover:text-pink-400 transition">Twitter</a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition">Latest 3D Creations</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Most Popular Items</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Customer Favorites</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">On Sale</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Custom Orders</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">3D Items</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition">3D Keychains</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Lithophanes</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">3D Printed Lamps</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Pen Holders</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Custom Prints</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Track Order</a></li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 md:my-12"></div>

        {/* Contact & Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h5 className="text-white font-semibold mb-3">📞 Get in Touch</h5>
            <ul className="text-sm space-y-2">
              <li>📧 support@infiniteprints.com</li>
              <li>📱 +1 (800) 123-4567</li>
              <li>🕒 Mon-Fri: 9AM-6PM (IST)</li>
              <li>🕒 Sat-Sun: 10AM-4PM (IST)</li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h5 className="text-white font-semibold mb-3">🏢 Company</h5>
            <ul className="text-sm space-y-2">
              <li>Headquarters: New Delhi, India</li>
              <li>Founded: 2024</li>
              <li>ISO Certified 3D Printing</li>
              <li>🌍 Free Shipping to 50+ Countries</li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h5 className="text-white font-semibold mb-3">💳 We Accept</h5>
            <div className="grid grid-cols-4 gap-2 text-2xl">
              <span title="Visa">💳</span>
              <span title="Mastercard">🎫</span>
              <span title="PayPal">📲</span>
              <span title="Apple Pay">��</span>
              <span title="Google Pay">🔵</span>
              <span title="UPI">↔️</span>
              <span title="Bank Transfer">🏦</span>
              <span title="Cryptocurrency">₿</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <p>&copy; 2024 Infinite Prints. All rights reserved. | Made with ❤️ in India</p>
            </div>
            <div className="text-right">
              <p>🌐 Available in 50+ Countries | 📦 Fast & Secure Shipping</p>
            </div>
          </div>

          {/* Certifications & Badges */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center text-2xl opacity-75">
            <span title="SSL Secured">🔒</span>
            <span title="Money Back Guarantee">💰</span>
            <span title="Fast Shipping">🚚</span>
            <span title="Quality Guaranteed">⭐</span>
            <span title="24/7 Support">📞</span>
          </div>
        </div>
      </div>

      {/* Top Arrow Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 hidden md:flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
