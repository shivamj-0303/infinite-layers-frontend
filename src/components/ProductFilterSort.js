import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { productApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

function ProductFilterSort({ 
  title, 
  searchQuery = '', 
  isAuthenticated,
  onAddToCart 
}) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter & Sort State
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, popular, price-low, price-high, rating
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(12);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let response;

      if (searchQuery) {
        response = await productApi.search(searchQuery, currentPage);
      } else {
        response = await productApi.list(currentPage, pageSize);
      }

      const fetchedProducts = response.data?.content || response.data || [];
      setProducts(fetchedProducts);
      setTotalPages(response.data?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status !== 401) {
        toast.error('Failed to load products');
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, pageSize]);

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.stockQuantity > 0);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, priceRange, inStockOnly]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleReset = () => {
    setSelectedCategory('');
    setSortBy('newest');
    setPriceRange([0, 10000]);
    setInStockOnly(false);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title || (searchQuery ? `Search Results for "${searchQuery}"` : 'All Products')}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-20 space-y-6">
              {/* Sort Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                      setCurrentPage(0);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* In Stock Filter */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                      setInStockOnly(e.target.checked);
                      setCurrentPage(0);
                    }}
                    className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-700">In Stock Only</span>
                </label>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={handleReset}
                  className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
                    >
                      {/* Product Image */}
                      <div className="relative bg-gray-200 h-48 overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].publicUrl}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <svg
                              className="h-12 w-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        {product.stockQuantity === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>
                                  {i < Math.round(product.rating) ? '★' : '☆'}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">
                              ({product.reviewCount || 0})
                            </span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="mb-3">
                          <span className="text-lg font-bold text-pink-500">
                            ₹{product.price?.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{product.originalPrice?.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="text-xs text-gray-600 mb-3">
                          {product.stockQuantity > 0 ? (
                            <span className="text-green-600 font-medium">
                              {product.stockQuantity} in stock
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">Out of stock</span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => {
                            onAddToCart(product.id, 1);
                          }}
                          disabled={product.stockQuantity === 0}
                          className={`w-full py-2 rounded-lg font-medium transition ${
                            product.stockQuantity === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-pink-500 hover:bg-pink-600 text-white'
                          }`}
                        >
                          {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === i
                            ? 'bg-pink-500 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage === totalPages - 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterSort;
