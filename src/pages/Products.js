import React, { useState, useEffect, useCallback } from 'react';
import { productApi, cartApi } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Products({ isAuthenticated }) {
  const navigate = useNavigate();

  // ---------------------------
  // STATE
  // ---------------------------
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ---------------------------
  // EFFECT
  // ---------------------------

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProducts();
  }, [fetchProducts]);

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
            return (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {/* Image */}
                <div
                  className="aspect-square bg-gray-100 mb-3 cursor-pointer overflow-hidden rounded-md"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={
                      product.images?.find(img => img.isPrimary)?.publicUrl ||
                      product.images?.[0]?.publicUrl ||
                      'https://via.placeholder.com/300'
                    }
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-pink-600 font-bold mb-4">
                    ₹{product.price?.toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-pink-500 text-white py-2 rounded font-medium hover:bg-pink-600 transition-colors"
                  >
                    Add to Cart
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