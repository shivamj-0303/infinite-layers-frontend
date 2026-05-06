import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Infinite Layers</h1>
          <p className="text-lg opacity-90">Creating amazing 3D printed products for everyone</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Our Story */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Infinite Layers was founded in 2024 with a simple mission: to bring 3D printing technology to everyone. We believe that 3D printing has the power to transform how people create, design, and think about objects in the real world.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our journey began with a passion for innovation and a desire to make custom 3D printing accessible and affordable. Starting with a small team and cutting-edge 3D printers, we've grown into a trusted brand that serves customers across India.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, Infinite Layers stands as a premier destination for high-quality 3D printed items, from personalized keychains and decorative pieces to custom designs tailored to our customers' unique requirements.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To provide accessible, high-quality 3D printing solutions that empower individuals and businesses to bring their creative visions to life. We're committed to delivering exceptional products with outstanding customer service.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To become the most trusted and innovative 3D printing company in India, known for our quality, customization options, and commitment to customer satisfaction. We envision a future where 3D printing is a standard tool for creation.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Infinite Layers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '⚙️',
                title: 'Advanced Technology',
                description: 'We use state-of-the-art 3D printers and high-quality materials to ensure outstanding results.'
              },
              {
                icon: '🎨',
                title: 'Custom Designs',
                description: 'Need something special? Our team can help you create custom 3D designs tailored to your vision.'
              },
              {
                icon: '🏆',
                title: 'Quality Assurance',
                description: 'Every product is carefully inspected to ensure it meets our high standards before shipping.'
              },
              {
                icon: '💳',
                title: 'Affordable Pricing',
                description: 'We offer competitive prices without compromising on quality. Great value for your money.'
              },
              {
                icon: '🚚',
                title: 'Fast Shipping',
                description: 'Quick delivery across India with real-time tracking. Standard delivery in 5-7 days.'
              },
              {
                icon: '🤝',
                title: 'Customer Support',
                description: '24/7 customer support ready to help you with any questions or concerns.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on quality. Every product undergoes rigorous quality checks.'
              },
              {
                title: 'Innovation',
                description: 'We constantly innovate and explore new 3D printing techniques and materials.'
              },
              {
                title: 'Customer Satisfaction',
                description: 'Your satisfaction is our success. We go the extra mile to ensure you love what you receive.'
              },
              {
                title: 'Sustainability',
                description: 'We care about the environment and use eco-friendly materials whenever possible.'
              },
              {
                title: 'Transparency',
                description: 'We believe in honest communication and transparent pricing with no hidden charges.'
              },
              {
                title: 'Community',
                description: 'We support the maker community and believe in sharing knowledge and experiences.'
              }
            ].map((value, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-2xl">✨</div>
                <div>
                  <h3 className="font-bold text-gray-900">{value.title}</h3>
                  <p className="text-gray-700 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <p className="text-gray-700 mb-4">
              At Infinite Layers, our team consists of passionate professionals with expertise in 3D printing, product design, and customer service. We're united by a common goal: to make 3D printing accessible and fun for everyone.
            </p>
            <p className="text-gray-700">
              From our skilled technicians who operate our 3D printers to our customer support team who ensures your satisfaction, every team member is dedicated to excellence. We believe in continuous learning and staying at the forefront of 3D printing technology.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Have a Question?</h3>
          <p className="mb-6">We'd love to hear from you. Reach out to our team anytime!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="inline-block bg-white hover:bg-gray-100 text-pink-600 font-bold py-2 px-6 rounded-lg transition"
            >
              Contact Us
            </Link>
            <a
              href="tel:+919057157661"
              className="inline-block border-2 border-white hover:bg-white hover:text-pink-600 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Call: +91 9057157661
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
