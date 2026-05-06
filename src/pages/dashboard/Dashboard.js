import React, { useState, useEffect } from 'react';
import { productApi } from '../../services/api';
import { cartApi } from '../../services/api';
import HeroSlider from '../../components/HeroSlider';
import CategoriesSection from '../../components/CategoriesSection';
import ProductGrid from '../../components/ProductGrid';
import toast from 'react-hot-toast';

function Dashboard({ user, isAuthenticated }) {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch products with pagination
      const response = await productApi.list(0, 12);
      const products = response.data?.content || [];

      // Simulate sorting into categories
      setNewArrivals(products.slice(0, 4));
      setTrendingProducts(products.slice(4, 8));
      setTopRatedProducts(products.slice(8, 12));
    } catch (error) {
      console.error('Error fetching products:', error);
      // Only show error toast if not a 401 (401 means not authenticated, which is expected)
      if (error.response?.status !== 401) {
        toast.error('Failed to load products');
      } else {
        // 401 without token means it's a public endpoint but returning 401
        console.warn('⚠️ Products endpoint returned 401 - security might not be configured correctly');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await cartApi.addItem(productId, quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSlider />
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* New 3D Items */}
      <ProductGrid
        title="Latest 3D Creations"
        products={newArrivals}
        isAuthenticated={isAuthenticated}
        onAddToCart={handleAddToCart}
        loading={loading}
      />

      {/* Best Sellers */}
      <ProductGrid
        title="Most Popular Items"
        products={trendingProducts}
        isAuthenticated={isAuthenticated}
        onAddToCart={handleAddToCart}
        loading={loading}
      />

      {/* Top Rated */}
      <ProductGrid
        title="Customer Favorites"
        products={topRatedProducts}
        isAuthenticated={isAuthenticated}
        onAddToCart={handleAddToCart}
        loading={loading}
      />

      {/* Special Offer Banner */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Custom 3D Printing</h2>
          <p className="text-lg md:text-xl mb-6 opacity-90">Get 15% OFF on your first order! Transform your ideas into stunning 3D printed creations.</p>
          <button className="bg-white hover:bg-gray-100 text-pink-600 font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
            Explore All Products
          </button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
