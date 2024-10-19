import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white ">
      <ShoppingHeader />
      <main className=" flex flex-col w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
