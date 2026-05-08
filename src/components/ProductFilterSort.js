import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { productApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

function ProductFilterSort({
  title,
  searchQuery = '',
  categoryId = null,
  isAuthenticated,
  onAddToCart
}) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort State
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
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

    // CATEGORY FILTER
    if (categoryId) {
      filtered = filtered.filter(
        (product) => product.categoryId === categoryId
      );
    }

    // PRICE FILTER
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );

    // STOCK FILTER
    if (inStockOnly) {
      filtered = filtered.filter(
        (product) => product.stockQuantity > 0
      );
    }

    // SORTING
    switch (sortBy) {
      case 'newest':
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case 'popular':
        filtered.sort(
          (a, b) => (b.views || 0) - (a.views || 0)
        );
        break;

      case 'rating':
        filtered.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
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

  }, [
    products,
    categoryId,
    sortBy,
    priceRange,
    inStockOnly
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleReset = () => {
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
            {title || (searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'All Products')}
          </h1>

          <p className="text-gray-600">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-20 space-y-6">

              {/* Sort */}
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

              {/* Price Range */}
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
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value)
                      ]);

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

              {/* Stock Filter */}
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

                  <span className="text-sm font-medium text-gray-700">
                    In Stock Only
                  </span>
                </label>
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>

                <p className="text-gray-600 mb-4">
                  Try adjusting your filters
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
                      {/* Image */}
                      <div className="relative bg-gray-200 h-48 overflow-hidden">

                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].publicUrl}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            No Image
                          </div>
                        )}

                        {product.stockQuantity === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">

                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mb-3">
                          <span className="text-lg font-bold text-pink-500">
                            ₹{product.price?.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product.id, 1);
                          }}
                          disabled={product.stockQuantity === 0}
                          className={`w-full py-2 rounded-lg font-medium transition ${
                            product.stockQuantity === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-pink-500 hover:bg-pink-600 text-white'
                          }`}
                        >
                          {product.stockQuantity === 0
                            ? 'Out of Stock'
                            : 'Add to Cart'}
                        </button>

                      </div>
                    </div>
                  ))}

                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterSort;
