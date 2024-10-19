import React from "react";

const AdminFeatures = () => {
  return (
    <div className="p-8 bg-gray-100 h-full no-scrollbar overflow-y-scroll no-scrollbar overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">Admin Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
          <p className="text-gray-600 mb-4">
            Add, update, or delete products from the store. View stock levels
            and pricing details.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Go to Products
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
          <p className="text-gray-600 mb-4">
            View and manage customer orders. Update order statuses and handle
            refunds.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Go to Orders
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
          <p className="text-gray-600 mb-4">
            Create, update, or delete product categories to organize your
            inventory.
          </p>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
            Go to Categories
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <p className="text-gray-600 mb-4">
            View and manage registered users, their roles, and permissions.
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Go to Users
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">View Analytics</h2>
          <p className="text-gray-600 mb-4">
            Track your store’s performance with detailed sales, orders, and user
            activity analytics.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Go to Analytics
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Coupons</h2>
          <p className="text-gray-600 mb-4">
            Create and manage discount coupons to drive sales and reward loyal
            customers.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Go to Coupons
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFeatures;
