import React, { useState } from 'react';
import toast from 'react-hot-toast';

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      toast.error('Please enter an order ID');
      return;
    }

    setLoading(true);
    setSearched(true);

    // Simulate API call
    setTimeout(() => {
      if (orderId.toUpperCase().startsWith('ORD')) {
        setOrderData({
          orderId: orderId.toUpperCase(),
          status: 'shipped',
          orderDate: '2024-05-01',
          deliveryDate: '2024-05-07',
          currentLocation: 'In Transit - Distribution Center (Jaipur)',
          trackingNumber: 'JBL0123456789',
          estimatedDelivery: '2024-05-07',
          items: [
            { name: '3D Keychain - Blue', quantity: 1, price: '₹299' },
            { name: '3D Printed Lamp - White', quantity: 1, price: '₹1,499' }
          ],
          timeline: [
            { date: '2024-05-01', time: '10:30 AM', event: 'Order Placed', status: 'completed' },
            { date: '2024-05-02', time: '2:15 PM', event: 'Order Confirmed', status: 'completed' },
            { date: '2024-05-03', time: '11:00 AM', event: 'Processing', status: 'completed' },
            { date: '2024-05-04', time: '4:45 PM', event: 'Shipped from Warehouse', status: 'completed' },
            { date: '2024-05-05', time: '8:20 PM', event: 'In Transit', status: 'active' },
            { date: '2024-05-07', time: 'Expected', event: 'Out for Delivery', status: 'pending' },
            { date: '2024-05-07', time: 'Expected', event: 'Delivered', status: 'pending' }
          ],
          shippingAddress: {
            name: 'John Doe',
            phone: '+91 9876543210',
            address: '123, Sample Street, Jaipur, Rajasthan 302001',
            city: 'Jaipur',
            state: 'Rajasthan',
            pincode: '302001'
          }
        });
      } else {
        setOrderData(null);
        toast.error('Order ID not found. Please check and try again.');
      }
      setLoading(false);
    }, 500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'active':
        return 'text-blue-600';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100';
      case 'active':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-lg opacity-90">Enter your order ID to track your shipment</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Search Form */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <label className="block text-gray-800 font-semibold mb-4">Order ID</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g., ORD123456"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                {loading ? 'Searching...' : 'Track Order'}
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              💡 You can find your order ID in the confirmation email or in your account "My Orders" section
            </p>
          </form>
        </div>

        {/* Order Details */}
        {searched && orderData ? (
          <div className="space-y-8">
            {/* Order Header */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="text-2xl font-bold text-gray-900">{orderData.orderId}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="text-2xl font-bold text-blue-600 capitalize">{orderData.status}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Tracking Number</p>
                  <p className="text-lg font-semibold text-gray-900">{orderData.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-gray-900">{orderData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipment Timeline</h2>
              <div className="space-y-4">
                {orderData.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusBgColor(event.status)}`}>
                        {event.status === 'completed' && (
                          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {event.status === 'active' && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                        )}
                        {event.status === 'pending' && (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      {index < orderData.timeline.length - 1 && (
                        <div className={`w-1 h-12 ${event.status === 'completed' ? 'bg-green-600' : event.status === 'active' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`font-bold ${getStatusColor(event.status)}`}>{event.event}</p>
                      <p className="text-gray-600 text-sm">{event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Location */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">📍 Current Location</h3>
              <p className="text-lg text-gray-700">{orderData.currentLocation}</p>
            </div>

            {/* Order Items */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-pink-600">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="font-bold text-gray-900">{orderData.shippingAddress.name}</p>
                <p className="text-gray-700">{orderData.shippingAddress.address}</p>
                <p className="text-gray-700">{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.pincode}</p>
                <p className="text-gray-700 mt-2">📞 {orderData.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need help with your order?</h3>
              <p className="text-gray-600 mb-6">Contact our customer support team for assistance</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:shivamjangid0108@gmail.com"
                  className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Email Us
                </a>
                <a
                  href="tel:+919057157661"
                  className="inline-block border-2 border-pink-500 hover:bg-pink-50 text-pink-500 font-bold py-2 px-6 rounded-lg transition"
                >
                  Call: +91 9057157661
                </a>
              </div>
            </div>
          </div>
        ) : searched && !orderData ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-lg">Order not found. Please check your order ID and try again.</p>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            <p>Enter your order ID above to start tracking</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default TrackOrder;
