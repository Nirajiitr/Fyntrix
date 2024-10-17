import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/authPage/Login";
import Register from "./Pages/authPage/Register";
import AuthLayout from "./components/Auth/Layout";
import AdminLayout from "./components/Admin/Layout";
import AdminDashbord from "./Pages/adminPage/Dashbord";
import AdminProducts from "./Pages/adminPage/Products";
import AdminOrders from "./Pages/adminPage/Orders";
import AdminFeatures from "./Pages/adminPage/Features";
import NotFoundPage from "./Pages/NotFoundPage";
import ShoppingAccount from "./Pages/shoppingPage/Account";
import ShoppingCheckout from "./Pages/shoppingPage/Checkout";
import ShoppingHome from "./Pages/shoppingPage/Home";
import ShoppingListing from "./Pages/shoppingPage/Listing";
import ShoppingLayout from "./components/Shopping/Layout";
import CheckAuth from "./components/common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import Success from "./Pages/Success";
import Failure from "./Pages/Failure";
import PaymentProcess from "./Pages/shoppingPage/PaymentProcess";
import SearchResults from "./Pages/shoppingPage/SearchResults";
import DefaultPage from "./Pages/DefaultPage";
import {  PuffLoader } from "react-spinners";

const App = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  useEffect(() => {
    if ( location.pathname !== "/" && location.pathname !== "/auth") {
      dispatch(checkAuth()).finally(() => {
        setAuthChecked(true);
      });
    } else {
      setAuthChecked(true);
    }
  }, [dispatch, location.pathname]);
  if (isLoading && !authChecked) {
    return <div className="w-screen h-screen flex items-center justify-center">
         <PuffLoader
 color="#3671d6" size="40px" />
    </div>;
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashbord" element={<AdminDashbord />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />

          <Route path="payment/success" element={<Success />} />
          <Route path="payment/cancel" element={<Failure />} />
        </Route>
        <Route path="/payment/process" element={<PaymentProcess />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/shop/search" element={<SearchResults />} />
        <Route path="/" element={<DefaultPage />} />
      </Routes>
    </div>
  );
};

export default App;
