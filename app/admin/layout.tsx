"use client";
import React, { useState } from "react";

// TopNavbar Component
const TopNavbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-900">
          PUTA Admin Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <span className="hidden lg:block text-gray-600">Admin Name</span>
          <button
            className="hidden lg:block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            onClick={() => {
              /* Handle logout */
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar = ({
  menuItems,
  isOpen,
  toggleSidebar,
}: {
  menuItems: { title: string; path: string }[];
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <aside
      className={`bg-blue-900 text-white w-64 min-h-screen p-4 fixed top-0 left-0 z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform lg:translate-x-0 lg:static lg:block`}
    >
      <div className="mb-8 flex justify-between items-center lg:block">
        <h2 className="text-xl font-bold">PUTA Admin</h2>
        <button
          className="lg:hidden px-2 py-1 text-white hover:bg-blue-800 rounded-md"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className="block px-4 py-2 text-blue-300 rounded hover:bg-blue-800 transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

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
    { title: "Settings", path: "/admin/settings" },
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
