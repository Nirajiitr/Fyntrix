import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="max-w-md p-6 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Canceled
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your payment was canceled. If this was a mistake, please try again.
        </p>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            onClick={() => navigate("/shop/checkout")}
          >
            Go Back to Checkout Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Failure;
