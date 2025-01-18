export const TopNavbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="bg-gray-200 shadow-sm border-b border-gray-200 px-4 py-3">
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
