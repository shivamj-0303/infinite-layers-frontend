import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({ product, isAuthenticated, onAddToCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    setLoading(true); 
    try {
      await onAddToCart(product.id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get primary image or use placeholder
  const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                       product.images?.[0]?.url ||
                       'https://via.placeholder.com/300x300?text=No+Image';

  // Calculate average rating
  const avgRating = product.reviews?.length 
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  // Determine if product is on sale
  const originalPrice = product.originalPrice || product.price;
  const discount = originalPrice > product.price 
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Product';
          }}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 left-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-gray-100">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick View Button */}
        <button
          onClick={handleViewDetails}
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <span className="text-white font-semibold">Quick View</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Product Info */}
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
            {product.category?.name || 'Category'}
          </p>
          <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 hover:text-pink-500 transition">
            {product.name}
          </h3>

          {/* Rating */}
          {avgRating > 0 && (
            <div className="flex items-center gap-1 mt-2 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(avgRating) ? '' : 'opacity-30'}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-600">({product.reviews?.length || 0})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg md:text-xl font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-xs font-semibold mt-2 ${
            product.stock > 10 
              ? 'text-green-600' 
              : product.stock > 0 
              ? 'text-orange-600' 
              : 'text-red-600'
          }`}>
            {product.stock > 10 
              ? 'In Stock' 
              : product.stock > 0 
              ? `Only ${product.stock} left` 
              : 'Out of Stock'}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
          className={`w-full mt-4 py-2 px-3 rounded-lg font-semibold transition duration-300 text-sm md:text-base ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-lg hover:shadow-pink-300 active:scale-95'
          }`}
        >
          {loading ? '⏳ Adding...' : product.stock === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
