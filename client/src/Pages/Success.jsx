import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="max-w-md p-6 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            onClick={() => navigate("/shop/account")}
          >
            View Order Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
