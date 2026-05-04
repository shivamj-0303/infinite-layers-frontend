import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = ({ categories = [] }) => {
  const navigate = useNavigate();

  const defaultCategories = [
    {
      id: 1,
      name: '3D Keychains',
      icon: '🔑',
      color: 'from-blue-100 to-blue-50',
      slug: '3d-keychains'
    },
    {
      id: 2,
      name: 'Lithophanes',
      icon: '🖼️',
      color: 'from-purple-100 to-purple-50',
      slug: 'lithophanes'
    },
    {
      id: 3,
      name: '3D Printed Lamps',
      icon: '💡',
      color: 'from-yellow-100 to-yellow-50',
      slug: '3d-lamps'
    },
    {
      id: 4,
      name: 'Pen Holders',
      icon: '✏️',
      color: 'from-orange-100 to-orange-50',
      slug: 'pen-holders'
    }
  ];

  const items = categories.length > 0 ? categories : defaultCategories;

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Explore <span className="text-pink-500">3D Printed Items</span>
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-48 md:h-56 bg-gradient-to-br ${category.color || 'from-pink-100 to-pink-50'}`}
            >
              {/* Background with hover effect */}
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                {/* Icon */}
                <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 className="text-sm md:text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                  {category.name}
                </h3>

                {/* View All text - appears on hover */}
                <p className="text-xs text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            onClick={() => navigate('/products')}
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
