import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu on small screens
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="px-6 py-5 shadow-md flex justify-between items-center bg-black text-white dark:bg-gray-300 dark:text-black transition-colors duration-300">
      {/* Logo or Brand Name */}
      <h1 className="hidden md:block text-2xl font-bold tracking-wide">Smart Student ID Generator </h1>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex gap-6 text-lg font-medium items-center">
        <li>
          <button onClick={() => navigate("/")} className="hover:text-gray-800 transition duration-200">
            Home
          </button>
        </li>
        <li>
          <Link to="/dataform" className="hover:text-gray-800 transition duration-200">
            Create
          </Link>
        </li>
        <li>
          <Link to="/oldercards" className="hover:text-gray-800 transition duration-200">
            Older Cards
          </Link>
        </li>
        <li>
        <div className="ml-auto">
    <label htmlFor="themeToggle" className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        type="checkbox"
        id="themeToggle"
        className="sr-only"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <div className="block bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full transition-colors duration-300"></div>
      <span
        className={`absolute left-1 top-1 bg-white dark:bg-black w-4 h-4 rounded-full transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></span>
    </label>
  </div>
        </li>
      </ul>

      {/* Mobile Menu Button and Theme Toggle */}
      <div className="flex items-center w-full md:hidden">
  {/* Left-aligned Menu Button */}
  <div>
    <button onClick={handleMenuToggle} className="text-2xl focus:outline-none">
      ☰
    </button>
  </div>

  {/* Right-aligned Theme Toggle Switch */}
  <div className="ml-auto">
    <label htmlFor="themeToggle" className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        type="checkbox"
        id="themeToggle"
        className="sr-only"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <div className="block bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full transition-colors duration-300"></div>
      <span
        className={`absolute left-1 top-1 bg-white dark:bg-black w-4 h-4 rounded-full transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></span>
    </label>
  </div>
</div>


      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <ul className="z-50 absolute top-16 left-0 w-full bg-black text-white dark:bg-gray-300 dark:text-black flex flex-col items-center gap-4 py-4 md:hidden">
          <li>
            <button onClick={() => { navigate("/"); setIsMenuOpen(false); }} className="hover:text-gray-300 transition duration-200">
              Home
            </button>
          </li>
          <li>
            <Link to="/dataform" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition duration-200">
              Create
            </Link>
          </li>
          <li>
            <Link to="/oldercards" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition duration-200">
              Older Cards
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
