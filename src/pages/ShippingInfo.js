import React from 'react';

function ShippingInfo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-lg opacity-90">Learn about our delivery options and shipping times</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Shipping Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Delivery */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Standard Delivery</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold mt-1">✓</span>
                  <span><strong>Delivery Time:</strong> 5-7 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold mt-1">✓</span>
                  <span><strong>Cost:</strong> FREE for orders above ₹500</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold mt-1">✓</span>
                  <span><strong>Tracking:</strong> Real-time order tracking available</span>
                </li>
              </ul>
            </div>

            {/* Express Delivery */}
            <div className="border border-pink-300 rounded-lg p-6 bg-pink-50">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Express Delivery</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold mt-1">✓</span>
                  <span><strong>Delivery Time:</strong> 2-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold mt-1">✓</span>
                  <span><strong>Cost:</strong> ₹150 (Free above ₹2000)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold mt-1">✓</span>
                  <span><strong>Tracking:</strong> Real-time order tracking available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping Coverage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Coverage</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We ship to all cities and towns across India including:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">◆</span>
                <span>Metropolitan cities (Delhi, Mumbai, Bangalore, Chennai, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">◆</span>
                <span>Tier-2 cities (Jaipur, Pune, Lucknow, Ahmedabad, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">◆</span>
                <span>Tier-3 towns and villages (where courier services are available)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">◆</span>
                <span>Remote areas (at higher shipping rates)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Track */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Track Your Order</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900">Order Confirmation</h3>
                <p className="text-gray-700">You'll receive an order confirmation email immediately after purchase.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900">Processing</h3>
                <p className="text-gray-700">Your order will be processed within 24 hours. You'll receive a processing confirmation.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-900">Shipping</h3>
                <p className="text-gray-700">Once shipped, you'll receive a tracking link via email with courier partner details.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900">Delivery</h3>
                <p className="text-gray-700">Delivery confirmation will be sent once your order arrives at your location.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Packaging */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Packaging</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We take great care in packaging your order to ensure it arrives in perfect condition:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">📦</span>
                <span className="text-gray-700">Products are wrapped in bubble wrap and protective padding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">📦</span>
                <span className="text-gray-700">Sturdy boxes are used to prevent damage during transit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">📦</span>
                <span className="text-gray-700">Fragile items receive extra protection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">📦</span>
                <span className="text-gray-700">All packages are insured for transit protection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Contact our customer support team for more information about shipping.</p>
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
      </section>
    </div>
  );
}

export default ShippingInfo;
