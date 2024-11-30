import React from "react";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <footer
      className={`py-6 px-4 ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand or Logo */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Academy</h2>
          <p className="text-sm">Helping programmers worldwide.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/courses" className="hover:underline">
            Courses
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Academy. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
