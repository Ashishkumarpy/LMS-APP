import React from "react";

type HeaderProps = {
  activeItem: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  route: string;
  setRoute: (value: string) => void;
};

const Header = ({
  activeItem,
  open,
  setOpen,
  route,
  setRoute,
}: HeaderProps) => {
  const menuItems = ["Home", "Courses", "Profile", "Logout"];

  return (
    <header className="w-full bg-gray-200 dark:bg-gray-800 shadow-lg px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
        LMS App
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex space-x-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded ${
              activeItem === index
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setRoute(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 dark:text-gray-300"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-12 left-0 w-full bg-gray-200 dark:bg-gray-800 shadow-lg flex flex-col md:hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full px-4 py-2 text-left ${
                activeItem === index
                  ? "bg-blue-500 text-white"
                  : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                setRoute(item);
                setOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
