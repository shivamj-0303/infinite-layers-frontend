import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-pink-600 mb-4">404</h1>
        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Oops! Page Not Found</p>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-bold py-3 px-8 rounded-lg transition"
          >
            Go Back
          </button>
        </div>

        {/* Decorative element */}
        <div className="mt-12 text-6xl">🔍</div>
      </div>
    </div>
  );
};

export default NotFound;
