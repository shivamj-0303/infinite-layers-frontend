import React from 'react';
import ProductFilterSort from '../components/ProductFilterSort';
import { cartApi } from '../services/api';
import toast from 'react-hot-toast';

function FavoriteProducts({ isAuthenticated }) {
  const handleAddToCart = async (productId, quantity) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await cartApi.addItem(productId, null, quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <ProductFilterSort
      title="Customer Favorites"
      filterType="favorites"
      isAuthenticated={isAuthenticated}
      onAddToCart={handleAddToCart}
    />
  );
}

export default FavoriteProducts;
