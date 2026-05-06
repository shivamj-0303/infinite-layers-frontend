import React from 'react';

function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small pieces of data stored on your device (computer, tablet, mobile phone, etc.) when you visit a website. 
              They are widely used to make websites work more efficiently, as well as to provide information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Cookies</h2>
            <p>Infinite Layers uses cookies for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Authentication:</strong> To keep you logged in and authenticated</li>
              <li><strong>Preferences:</strong> To remember your preferences and settings</li>
              <li><strong>Security:</strong> To prevent fraud and enhance security</li>
              <li><strong>Analytics:</strong> To understand how you use our Website and improve it</li>
              <li><strong>Functionality:</strong> To make our Website function properly</li>
              <li><strong>Marketing:</strong> To deliver targeted advertisements and promotions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable you to navigate the website and use its features 
              such as accessing secure areas and using shopping carts.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Performance Cookies</h3>
            <p>
              These cookies collect information about how you use our website, such as which pages you visit and if you get error messages. 
              They help us improve the performance of our website.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Functional Cookies</h3>
            <p>
              These cookies allow our website to remember choices you make (such as your username, language, or the region you are in) and 
              provide enhanced, more personal features.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Targeting Cookies</h3>
            <p>
              These cookies collect information about your browsing habits to make advertising relevant to you and your interests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Third-Party Cookies</h2>
            <p>
              We may allow third-party service providers to place cookies on our website for analytics, advertising, and other purposes. 
              These companies may collect information about your online activities across websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. How to Control Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can typically find cookie settings in the "Options" 
              or "Preferences" menu of your browser. You can choose to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Accept all cookies</li>
              <li>Reject all cookies</li>
              <li>Be notified when a cookie is set</li>
              <li>Delete cookies when you close your browser</li>
            </ul>
            <p className="mt-4">
              <strong>Note:</strong> If you disable cookies, some features of our website may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Do Not Track</h2>
            <p>
              Some browsers include a "Do Not Track" feature. Currently, there is no industry standard for recognizing Do Not Track signals, 
              and our website does not respond to Do Not Track browser signals. However, you can use other tools to control data collection 
              and use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or other operational, legal, or 
              regulatory reasons. Your continued use of our website following the posting of revised Cookie Policy means that you accept 
              and agree to the changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us at:</p>
            <p className="mt-4">
              <strong>Email:</strong> shivamjangid0108@gmail.com<br />
              <strong>Phone:</strong> +91 9057157661<br />
              <strong>Address:</strong> Jaipur, Rajasthan, India
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">Last updated: May 2026</p>
        </div>
      </div>
    </div>
  );
}

export default CookiePolicy;
