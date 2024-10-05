import React from "react";
import { Button } from "../ui/button";
import { AlignLeft, LogOut } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className=" flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block">
        <AlignLeft />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="flex gap-2 bg-black text-white items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          Logout
          <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
