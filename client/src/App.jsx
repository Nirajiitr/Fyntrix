import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/authPage/login";
import Register from "./Pages/authPage/register";
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
import UnAuthPage from "./Pages/UnAuthPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";


const App = () => {
  const dispatch = useDispatch()
 const {isAuthenticated, user, isLoading} = useSelector((state)=>state.auth)
  useEffect(()=>{
    dispatch(checkAuth())
  }, [dispatch])
 
if(isLoading){
  return <div>Loading...</div>
}
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path="dashbord" element={<AdminDashbord />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
