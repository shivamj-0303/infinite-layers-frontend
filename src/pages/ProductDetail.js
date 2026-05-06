import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi, cartApi, wishlistApi } from '../services/api';
import toast from 'react-hot-toast';

function ProductDetail({ isAuthenticated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  const fetchRelatedProducts = useCallback(async (categoryId) => {
    try {
      const response = await productApi.list(0, 12);
      const related =
        response.data?.content
          ?.filter(p => p.categoryId === categoryId && p.id !== id)
          .slice(0, 4) || [];

      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }, [id]);

  const checkWishlist = useCallback(async (productId) => {
    try {
      const response = await wishlistApi.get();
      const wishlisted = response.data?.some(item => item.id === productId);
      setIsWishlisted(wishlisted);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  }, []);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);

      const response = await productApi.getById(id);
      const data = response.data;

      setProduct(data);

      if (data.images?.length > 0) {
        const primaryImage =
          data.images.find(img => img.isPrimary) || data.images[0];
        setSelectedImage(primaryImage);
      }

      await fetchRelatedProducts(data.categoryId);

      if (isAuthenticated) {
        await checkWishlist(id);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated, navigate, fetchRelatedProducts, checkWishlist]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      setIsAddingToCart(true);
      await cartApi.addItem(product.id, null, quantity);
      toast.success(`Added ${quantity} item(s) to cart!`);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProduct();
  }, [fetchProduct]);
  const handleBuyNow = () => {
    setShowComingSoonModal(true);
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      navigate('/login');
      return;
    }

    try {
      if (isWishlisted) {
        await wishlistApi.remove(product.id);
        setIsWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        await wishlistApi.add(product.id);
        setIsWishlisted(true);
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const handleQuantityChange = (value) => {
    const newQty = parseInt(value);
    if (newQty > 0 && newQty <= (product?.stock || 999)) {
      setQuantity(newQty);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const avgRating = product.reviews?.length 
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  const originalPrice = product.originalPrice || product.price;
  const discount = originalPrice > product.price 
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate('/')} className="hover:text-pink-500">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/latest-products')} className="hover:text-pink-500">Products</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={selectedImage?.publicUrl || 'https://via.placeholder.com/500x500?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=Product';
                }}
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                  -{discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage?.id === image.id ? 'border-pink-500' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={image.publicUrl}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=Img';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-between">
            {/* Product Details */}
            <div>
              {/* Category */}
              <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                {product.category?.name || 'Category'}
              </p>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(avgRating) ? '' : 'opacity-30'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {avgRating} ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-pink-600">₹{product.price?.toLocaleString()}</span>
                  {originalPrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      ₹{originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Product Details */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2">
                <p className="text-sm"><span className="font-semibold text-gray-800">SKU:</span> {product.sku || 'N/A'}</p>
                <p className="text-sm"><span className="font-semibold text-gray-800">Availability:</span> 
                  <span className={`ml-2 ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-semibold min-w-fit">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-16 text-center border-0 focus:outline-none focus:ring-0"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity || 999, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stockQuantity <= 0}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Buy Now
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className={`w-full border-2 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>

              {/* Stock Warning */}
              {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                <p className="text-orange-600 text-sm font-semibold">Only {product.stockQuantity} items left!</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.slice(0, 5).map((review, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? '' : 'opacity-30'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{review.createdAt?.split('T')[0]}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => {
                  navigate(`/product/${relProduct.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={relProduct.images?.find(img => img.isPrimary)?.publicUrl || relProduct.images?.[0]?.publicUrl || 'https://via.placeholder.com/300x300?text=Product'}
                    alt={relProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">{relProduct.name}</h3>
                  <p className="text-pink-600 font-bold">₹{relProduct.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h2>
            <p className="text-gray-600 mb-6">
              The checkout feature is coming very soon. In the meantime, you can add items to your cart and wishlist!
            </p>
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
