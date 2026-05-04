import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CustomerCare = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && message && subject) {
      toast.success('Your message has been sent! We will get back to you soon.');
      setEmail('');
      setMessage('');
      setSubject('');
    } else {
      toast.error('Please fill all fields');
    }
  };

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer 30-day returns on all items. Products must be in original condition with tags attached.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) is also available for select items.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes! We ship to 50+ countries worldwide. Shipping costs vary by location.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use SSL encryption and PCI-DSS compliance for all transactions. Your data is completely secure.'
    },
    {
      question: 'Can I track my order?',
      answer: 'You will receive a tracking link via email once your order ships. You can track it in real-time.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, digital wallets, and cryptocurrencies.'
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'support@anon.com',
      description: 'We reply within 24 hours'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (800) 123-4567',
      description: '24/7 available'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      value: 'Coming Soon',
      description: 'Real-time support'
    },
    {
      icon: '🌐',
      title: 'WhatsApp',
      value: '+1 (800) 123-4567',
      description: 'Quick responses'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">24/7 Customer Care</h1>
          <p className="text-lg md:text-xl opacity-90">We're here to help you anytime, anywhere</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-pink-600 font-semibold mb-2">{method.value}</p>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Related</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="product">Product Information</option>
                    <option value="shipping">Shipping</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    rows="5"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info Box */}
            <div className="space-y-8">
              {/* Coming Soon Notice */}
              <div className="bg-gradient-to-r from-pink-100 to-orange-100 border-l-4 border-pink-500 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-pink-600 mb-3">🚀 Coming Soon</h3>
                <p className="text-gray-700 mb-4">
                  Our enhanced customer care features are coming very soon! We're working on adding:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span> Live Chat Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span> Video Call Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span> AI Chatbot
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span> Community Forum
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-600">✓</span> Self-Service Portal
                  </li>
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-3xl font-bold text-pink-600">99%</p>
                  <p className="text-gray-600 text-sm mt-2">Customer Satisfaction</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-3xl font-bold text-pink-600">24hrs</p>
                  <p className="text-gray-600 text-sm mt-2">Average Response</p>
                </div>
              </div>

              {/* Quick Help */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Help Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-pink-600 hover:text-pink-700 flex items-center gap-2">📖 View Documentation</a></li>
                  <li><a href="#" className="text-pink-600 hover:text-pink-700 flex items-center gap-2">🎥 Watch Video Tutorials</a></li>
                  <li><a href="#" className="text-pink-600 hover:text-pink-700 flex items-center gap-2">🐛 Report a Bug</a></li>
                  <li><a href="#" className="text-pink-600 hover:text-pink-700 flex items-center gap-2">💡 Share Feedback</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-pink-500 text-xl">Q</span>
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Still Need Help */}
          <div className="mt-12 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg p-8 text-center border-2 border-pink-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Can't find what you're looking for?</h3>
            <p className="text-gray-700 mb-6">Don't worry! Our support team is always ready to help you.</p>
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
              💬 Start Live Chat (Coming Soon)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerCare;
