import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartApi } from '../../services/api';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.get();
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load cart');
      toast.error('Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    try {
      await cartApi.updateItem(itemId, newQuantity);
      await fetchCart();
      toast.success('Cart updated');
    } catch (err) {
      console.log('FULL ERROR:', err);
      console.log('RESPONSE:', err.response);
      console.log('DATA:', err.response?.data);

      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        'Something went wrong';

      toast.error(message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await cartApi.removeItem(itemId);
      await fetchCart();
      toast.success('Item removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error || !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 font-semibold text-lg mb-4">{error || 'Unable to load cart'}</p>
          <button
            onClick={handleContinueShopping}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const cartItems = cart.items || [];
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 6.293a1 1 0 00.756 1.471h12.074a1 1 0 00.989-1.2l-.716-3.577M17 13v6m-5 0v6m-5-6h10" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping and add items to your cart</p>
          <button
            onClick={handleContinueShopping}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button onClick={handleContinueShopping} className="hover:text-pink-500">Home</button>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Shopping Cart</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product?.images?.[0]?.publicUrl || 'https://via.placeholder.com/200'}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.product?.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      ₹{(item.product?.price || 0).toFixed(2)} each
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition"
                      >
                        −
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        disabled={item.quantity >= item.product?.stockQuantity}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className={`px-3 py-1 rounded transition ${
                          item.quantity >= item.product?.stockQuantity
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <button
              onClick={handleContinueShopping}
              className="mt-6 text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-2"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shipping === 0 ? '🎁 FREE' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600 font-semibold">You get free shipping! 🎉</p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Total */}
              <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span className="text-pink-600">₹{total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 mb-4"
              >
                🛒 Proceed to Checkout
              </button>

              {/* Promo Code */}
              <div className="border-t border-gray-200 pt-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                />
                <button className="w-full border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-semibold py-2 rounded-lg transition">
                  Apply Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
