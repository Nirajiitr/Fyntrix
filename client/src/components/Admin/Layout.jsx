import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex h-full w-full ">
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col h-full w-full">
        <AdminHeader setOpenSidebar={setOpenSidebar} />
        <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6 h-full w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
