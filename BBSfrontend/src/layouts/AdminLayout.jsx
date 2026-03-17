import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <AdminSidebar name="Admin felület">
      <Outlet />
    </AdminSidebar>
  );
}

export default AdminLayout;
