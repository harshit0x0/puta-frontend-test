// Sidebar Component
export const Sidebar = ({
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
      className={`bg-blue-900 text-white w-40 min-h-screen p-4 fixed top-0 left-0 z-40 transform ${
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
