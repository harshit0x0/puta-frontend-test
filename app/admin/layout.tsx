"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/admin/SideBar";
import { TopNavbar } from "@/components/admin/TopNavbar";

// Main Layout Component
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin" },
    { title: "Members", path: "/admin/members" },
    { title: "Activities", path: "/admin/activities" },
    { title: "News", path: "/admin/news" },
    // { title: "Settings", path: "/admin/settings" },s
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar
        menuItems={menuItems}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
