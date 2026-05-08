import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = ({ categories = [] }) => {
  const navigate = useNavigate();

  const defaultCategories = [
    {
      id: 'de5b12f6-db77-44d2-aa5f-db19e03ca4ce',
      name: '3D Keychains',
      color: 'from-blue-100 to-blue-50',
      slug: '3d-keychains',
      imagePath: '/images/categories/3d-keychains.jpg'
    },
    {
      id: 'd897daed-ebf0-4b23-919c-e29542dd2fd6',
      name: 'lithoframes',
      color: 'from-purple-100 to-purple-50',
      slug: 'lithoframes',
      imagePath: '/images/categories/lithoframes.jpg'
    },
    {
      id: 'e3d7b412-8f92-4a5c-9c1a-6d8f2b7a3e9c',
      name: '3D Printed Lamps',
      color: 'from-yellow-100 to-yellow-50',
      slug: '3d-lamps',
      imagePath: '/images/categories/3d-lamps.jpg'
    },
    {
      id: 'ca33b68a-e946-4ebe-9591-52d1a6a9f793',
      name: 'Pen Holders',
      color: 'from-orange-100 to-orange-50',
      slug: 'pen-holders',
      imagePath: '/images/categories/pen-holders.jpg'
    }
  ];

  const items = categories.length > 0 ? categories : defaultCategories;

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          Explore <span className="text-pink-500">3D Printed Items</span>
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-48 md:h-56`}
            >
              {/* Background Image with Fallback */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color || 'from-pink-100 to-pink-50'}`}>
                {category.imagePath && (
                  <img
                    src={category.imagePath}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                {/* Icon - Falls back if image fails */}
                <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className="text-sm md:text-lg font-bold text-white drop-shadow-md group-hover:text-white transition-colors duration-300">
                  {category.name}
                </h3>

                {/* View All text - appears on hover */}
                <p className="text-xs text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                  View All →
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white bg-opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12 md:my-16">
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-pink-300 to-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-pink-300 to-gray-300"></div>
        </div>

        {/* Browse All CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              navigate('/products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg hover:shadow-pink-300 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 active:scale-95"
          >
            Browse All 3D Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
