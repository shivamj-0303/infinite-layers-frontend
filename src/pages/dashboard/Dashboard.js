import React from 'react';

function Dashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.sub || user?.email || 'User'}!
          </h1>
          <p className="text-gray-600">
            You have successfully logged in to Infinite Prints.
          </p>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg text-gray-900">{user?.sub || user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="text-lg text-gray-900">Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-blue-600">0</span>
                <span className="ml-3 text-gray-600">Orders Placed</span>
              </div>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-green-600">0</span>
                <span className="ml-3 text-gray-600">Items in Cart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8 bg-blue-50 rounded-lg shadow-md p-8 text-center border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">More Features Coming Soon</h2>
          <p className="text-blue-700">
            Product catalog, shopping cart, and order management features will be available shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
