import React from 'react';
import { useParams } from 'react-router-dom';
import ProductFilterSort from '../components/ProductFilterSort';
import { cartApi } from '../services/api';
import toast from 'react-hot-toast';

function CategoryProducts({ isAuthenticated }) {
  const { categoryId } = useParams();

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
      title="Category Products"
      categoryId={categoryId}
      isAuthenticated={isAuthenticated}
      onAddToCart={handleAddToCart}
    />
  );
}

export default CategoryProducts;