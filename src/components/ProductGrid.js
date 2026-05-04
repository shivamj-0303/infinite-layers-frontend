import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  title, 
  products = [], 
  isAuthenticated, 
  onAddToCart,
  loading = false,
  error = null
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold">Error loading products</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-semibold text-lg">No products found</p>
        <p className="text-gray-400 text-sm">Check back later for more items</p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        {title && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAuthenticated={isAuthenticated}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* See More Button */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-white border-2 border-pink-500 hover:bg-pink-50 text-pink-500 font-bold py-3 px-8 rounded-full transition duration-300 hover:shadow-lg">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
