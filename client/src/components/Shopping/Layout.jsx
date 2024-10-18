import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col no-scrollbar w-full h-full bg-white overflow-hidden overflow-y-scroll">
      <ShoppingHeader />
      <main className=" flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
