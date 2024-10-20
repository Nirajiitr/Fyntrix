import { getAllOrder } from "@/store/admin/order-slice";
import { getAllProduct } from "@/store/admin/product-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { orderList } = useSelector((state) => state.adminOrder);
  const { productList } = useSelector((state) => state.adminProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const totalSale =
    orderList && orderList.length > 0
      ? orderList.reduce(
          (sum, currentItem) =>
            currentItem.paymentStatus === "paid"
              ? sum + currentItem.totalAmount
              : sum,
          0
        )
      : 0;
  const totalOrder =
    orderList && orderList.length > 0
      ? orderList.reduce(
          (sum, currentItem) =>
            currentItem.paymentStatus === "paid" ? (sum += 1) : sum,
          0
        )
      : 0;

  const totalProductQuantity =
    orderList && orderList.length > 0
      ? orderList
          .filter((order) => order.paymentStatus === "paid")
          .flatMap((order) => order.cartItems)
          .reduce((sum, item) => sum + item.quantity, 0)
      : 0;
  const totalUser =
    orderList && orderList.length > 0
      ? orderList
          .filter((order) => order.paymentStatus === "paid" && order.userId)
          .map((order) => order.userId)
          .filter((userId, index, self) => self.indexOf(userId) === index)
      : [];

  return (
    <div className="p-8 bg-gray-100 h-full no-scrollbar overflow-hidden overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <h2 className="text-2xl font-bold mb-6">Sale Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
          <p className="text-2xl font-bold text-blue-600">₨.{totalSale}</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600">{totalOrder}</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Product Quantity
          </h2>
          <p className="text-2xl font-bold text-blue-600">
            {totalProductQuantity}
          </p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">
            {totalUser?.length}
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Current Product Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700">
                  {product?.title}
                </h2>
                <p className="text-2xl font-bold text-blue-600">
                  Total Stock : {product?.totalStock}
                </p>
              </div>
            ))
          : null}
      </div>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
          >
            Manage Products
          </button>
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
