import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
