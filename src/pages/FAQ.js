import React, { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is 3D printing?",
      answer: "3D printing is a process of creating three-dimensional objects from a digital design. It works by depositing material layer by layer to build up the final object. Our 3D printed items are created using advanced printing technology to produce high-quality, detailed products."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery typically takes 5-7 business days within India. Express delivery (2-3 business days) is also available. Delivery times may vary depending on your location and the complexity of your custom order. You can track your order using the order ID provided at checkout."
    },
    {
      question: "Can I customize my order?",
      answer: "Yes! We offer customization options for most of our products. You can request custom designs, colors, and sizes. Visit our Custom Orders section to submit your requirements. Our team will get in touch with you within 24 hours to discuss your custom project."
    },
    {
      question: "What materials are used?",
      answer: "We use high-quality 3D printing materials including PLA, ABS, PETG, and Resin depending on the product requirements. Each material is chosen for durability and appearance. Details about material used for each product are mentioned in the product description."
    },
    {
      question: "Is there a warranty on products?",
      answer: "Yes, all our products come with a 30-day quality guarantee. If you receive a product with manufacturing defects, we'll replace it free of cost. For custom orders, warranty details are discussed during the customization process."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is dispatched, you'll receive a tracking link via email and SMS. You can use this link to track your package in real-time. Alternatively, you can visit our Track Order page and enter your order ID."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day return policy on most products. If you're not satisfied with your purchase, you can initiate a return within 14 days of delivery. The product should be unused and in its original packaging. Visit our Returns page for detailed instructions."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within India. We're working on expanding our international shipping. Sign up for our newsletter to be notified when international shipping becomes available."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team through multiple channels: Email: shivamjangid0108@gmail.com, Phone: +91 9057157661, Contact Form: Visit our Contact Us page. We respond within 24 hours on business days."
    },
    {
      question: "Are your products eco-friendly?",
      answer: "We use environmentally conscious 3D printing materials and processes. PLA material, which we use for many products, is biodegradable. We're committed to sustainable manufacturing practices."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg opacity-90">Find answers to common questions about our products and services</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-900 flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Didn't find your answer?</h3>
          <p className="text-gray-600 mb-6">Our customer support team is here to help. Get in touch with us anytime!</p>
          <a
            href="mailto:shivamjangid0108@gmail.com"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
