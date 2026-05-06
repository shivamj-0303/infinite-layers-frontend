import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductFilterSort from '../components/ProductFilterSort';
import { cartApi } from '../services/api';
import toast from 'react-hot-toast';

function SearchResults({ isAuthenticated }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

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
    }
  };

  return (
    <ProductFilterSort
      title={query ? `Search Results for "${query}"` : 'Search Products'}
      searchQuery={query}
      filterType="search"
      isAuthenticated={isAuthenticated}
      onAddToCart={handleAddToCart}
    />
  );
}

export default SearchResults;
