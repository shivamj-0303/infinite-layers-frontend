import React from 'react';

function Returns() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Return & Refund Policy</h1>
          <p className="text-lg opacity-90">Easy returns within 14 days of delivery</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Return Window */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Window</h2>
          <div className="bg-pink-50 border-2 border-pink-300 rounded-lg p-6">
            <p className="text-gray-800 text-lg">
              You can initiate a return within <strong>14 days of delivery</strong>. To be eligible for a return, your product must meet the following conditions:
            </p>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">✓ Eligible for Return</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Unused and in original condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Original packaging intact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">All accessories and documentation included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Defective or damaged on arrival</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Wrong product delivered</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4">✗ Not Eligible for Return</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Used or worn items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Damaged due to misuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Custom/personalized orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Original packaging damaged</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span className="text-gray-700">Beyond 14 days of delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Return */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Return an Item</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900">Contact Us</h3>
                <p className="text-gray-700">Email us at shivamjangid0108@gmail.com or call +91 9057157661 with your order ID and reason for return.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900">Get Return Authorization</h3>
                <p className="text-gray-700">We'll review your request and provide a Return Authorization Number (RAN) along with return shipping instructions.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-900">Pack & Ship</h3>
                <p className="text-gray-700">Carefully pack the item with original packaging and accessories. Write the RAN on the shipping label.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900">Track & Wait</h3>
                <p className="text-gray-700">Ship the item via courier and track your return. We'll inspect the item upon receipt.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-gray-900">Receive Refund</h3>
                <p className="text-gray-700">After inspection, refunds are processed within 7-10 business days to your original payment method.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Refund Details */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Details</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Refund Amount</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Full refund:</strong> For defective or wrong items</li>
                <li>• <strong>Refund minus return shipping:</strong> For items returned within return window</li>
                <li>• <strong>Original price:</strong> Refund is for the product amount only (excluding delivery charges)</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Refund Processing</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Refunds are processed within 7-10 business days</li>
                <li>• Refund is credited to your original payment method</li>
                <li>• Credit card refunds may take additional 2-3 days to reflect</li>
                <li>• We'll send you a confirmation email when refund is processed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Special Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Cases</h2>
          <div className="space-y-4">
            <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
              <h3 className="font-bold text-gray-900 mb-2">Damaged in Transit</h3>
              <p className="text-gray-700">If your item arrives damaged, report it within 48 hours of delivery with photos. We'll arrange a replacement or refund immediately at no cost to you.</p>
            </div>

            <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
              <h3 className="font-bold text-gray-900 mb-2">Custom/Personalized Orders</h3>
              <p className="text-gray-700">Custom orders cannot be returned unless the item is defective or significantly different from the specifications discussed. Discuss return policy before placing custom orders.</p>
            </div>

            <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
              <h3 className="font-bold text-gray-900 mb-2">Final Sale Items</h3>
              <p className="text-gray-700">Some clearance or final sale items may not be eligible for returns. Check the product description before purchase.</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions about returns?</h3>
          <p className="text-gray-600 mb-6">Our customer support team is here to help with any return or refund questions.</p>
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

export default Returns;
