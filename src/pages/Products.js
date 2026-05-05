import React, { useState, useEffect } from 'react';
import { productApi, cartApi, wishlistApi } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Products({ isAuthenticated }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchCategories();
    fetchProducts(0);
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await (window.categoryApi?.list?.() || Promise.resolve({ data: [] }));
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await productApi.list(page, pageSize);
      setProducts(response.data?.content || []);
      setTotalPages(response.data?.totalPages || 1);
      setCurrentPage(page);
      applyFiltersAndSort(response.data?.content || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await wishlistApi.get();
      setWishlistItems(response.data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const applyFiltersAndSort = (productsToFilter) => {
    let filtered = [...productsToFilter];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId == selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => {
          const ratingA = a.reviews?.length ? a.reviews.reduce((s, r) => s + r.rating, 0) / a.reviews.length : 0;
          const ratingB = b.reviews?.length ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length : 0;
          return ratingB - ratingA;
        });
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
  };

  const handleFilterChange = () => {
    applyFiltersAndSort(products);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setSortBy('newest');
    setPriceRange([0, 10000]);
    setInStockOnly(false);
    setCurrentPage(0);
    fetchProducts(0);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await cartApi.addItem(productId, null, 1);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const handleWishlist = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      navigate('/login');
      return;
    }

    try {
      const isInWishlist = wishlistItems.some(item => item.id === productId);
      if (isInWishlist) {
        await wishlistApi.remove(productId);
        setWishlistItems(wishlistItems.filter(item => item.id !== productId));
        toast.success('Removed from wishlist');
      } else {
        await wishlistApi.add(productId);
        setWishlistItems([...wishlistItems, { id: productId }]);
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse All Products</h1>
          <p className="text-lg opacity-90">Discover our complete collection of 3D printed items</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    handleCategoryChange(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    handleSortChange(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                <label className="block text-sm font-semibold text-gray-800 mb-3">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => {
                      handlePriceChange(0, e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full accent-pink-500"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => {
                      handlePriceChange(1, e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full accent-pink-500"
                  />
                  <div className="flex justify-between text-xs text-gray-700 mt-2">
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
                      handleFilterChange();
                    }}
                    className="w-4 h-4 text-pink-500 rounded accent-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-800">In Stock Only</span>
                </label>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-6 text-gray-600">
                  Showing {filteredProducts.length} products
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const isWishlisted = wishlistItems.some(item => item.id === product.id);
                    const avgRating = product.reviews?.length 
                      ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
                      : 0;
                    const originalPrice = product.originalPrice || product.price;
                    const discount = originalPrice > product.price 
                      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
                      : 0;

                    return (
                      <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        {/* Image */}
                        <div className="relative overflow-hidden bg-gray-100 aspect-square cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                          <img
                            src={product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url || 'https://via.placeholder.com/300x300?text=Product'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                            }}
                          />
                          {discount > 0 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                              -{discount}%
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWishlist(product.id);
                            }}
                            className="absolute top-2 left-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                          >
                            <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{product.category?.name || 'Category'}</p>
                          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 cursor-pointer hover:text-pink-500" onClick={() => navigate(`/product/${product.id}`)}>
                            {product.name}
                          </h3>

                          {/* Rating */}
                          {avgRating > 0 && (
                            <div className="flex items-center gap-1 mb-2">
                              <div className="flex text-yellow-400 text-xs">
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
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-pink-600">₹{product.price?.toLocaleString()}</span>
                            {originalPrice > product.price && (
                              <span className="text-sm text-gray-400 line-through">₹{originalPrice?.toLocaleString()}</span>
                            )}
                          </div>

                          {/* Stock Status */}
                          <p className={`text-xs font-semibold mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </p>

                          {/* Button */}
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={product.stock <= 0}
                            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
                          >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-12">
                  <button
                    onClick={() => fetchProducts(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const pageNum = currentPage > 2 ? currentPage - 2 + i : i;
                    if (pageNum >= totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchProducts(pageNum)}
                        className={`px-3 py-2 rounded-lg transition ${
                          pageNum === currentPage
                            ? 'bg-pink-500 text-white'
                            : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => fetchProducts(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
