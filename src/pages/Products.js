import React, { useState, useEffect, useCallback } from 'react';
import { productApi, cartApi, wishlistApi } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Products({ isAuthenticated }) {
  const navigate = useNavigate();

  // ---------------------------
  // STATE
  // ---------------------------
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  // ---------------------------
  // DATA FETCHING
  // ---------------------------

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await productApi.list(0, 50); // simple bulk fetch
      setProducts(res.data?.content || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await wishlistApi.get();
      setWishlistItems(res.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ---------------------------
  // EFFECT
  // ---------------------------

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchProducts();

    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [fetchProducts, fetchWishlist, isAuthenticated]);

  // ---------------------------
  // HANDLERS
  // ---------------------------

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    try {
      await cartApi.addItem(productId, null, 1);
      toast.success('Added to cart');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    }
  };

  const handleWishlist = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    const exists = wishlistItems.some(item => item.id === productId);

    try {
      if (exists) {
        await wishlistApi.remove(productId);
        setWishlistItems(prev => prev.filter(i => i.id !== productId));
        toast.success('Removed from wishlist');
      } else {
        await wishlistApi.add(productId);
        setWishlistItems(prev => [...prev, { id: productId }]);
        toast.success('Added to wishlist');
      }
    } catch (err) {
      console.error(err);
      toast.error('Wishlist update failed');
    }
  };

  // ---------------------------
  // UI
  // ---------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-b-2 border-pink-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-600">
          No products available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isWishlisted = wishlistItems.some(item => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
              >
                {/* Image */}
                <div
                  className="aspect-square bg-gray-100 mb-3 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={
                      product.images?.find(img => img.isPrimary)?.url ||
                      product.images?.[0]?.url ||
                      'https://via.placeholder.com/300'
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-pink-600 font-bold mb-2">
                  ₹{product.price?.toLocaleString()}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex-1 bg-pink-500 text-white py-1 rounded hover:bg-pink-600"
                  >
                    Add
                  </button>

                  <button
                    onClick={() => handleWishlist(product.id)}
                    className={`px-3 rounded border ${
                      isWishlisted
                        ? 'bg-red-100 text-red-500 border-red-300'
                        : 'text-gray-600 border-gray-300'
                    }`}
                  >
                    ♥
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;