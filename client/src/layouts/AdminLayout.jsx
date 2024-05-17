import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/components/admin-sidebar";

const AdminLayout = () => {
  return (
    <div className="md:grid md:grid-cols-12 md:gap-3">
      <div className="md:col-span-3 min-h-screen bg-gray-800 w-72">
        <AdminSidebar />
      </div>
      <div className="md:col-span-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
