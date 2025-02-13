import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const [wishlistCount, setWishlistCount] = useState(0); // Example count
  const [cartCount, setCartCount] = useState(0); // Example count
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  return (
    <nav className="bg-white px-6 md:px-20 flex items-center justify-between relative z-50 py-6">
      {/* Left Side - Nav Links (Hidden on small screens) */}
      <div className="hidden md:flex gap-6 text-sm font-bold">
        {["HOME", "SHOP", "CONTACT"].map((item, index) => (
          <Link
            key={index}
            to={`/${item.toLowerCase()}`}
            className="relative text-gray-900 font-bold hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Middle - Logo (Always Centered) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-20 w-20 md:h-24 md:w-24">
        <img src={logo} alt="Logo" className="object-contain w-full h-full" />
      </div>

      {/* Right Side - Menu Items */}
      <div className="hidden md:flex items-center gap-6 text-gray-900 text-sm font-bold">
        {/* Log in */}
        <Link to="/login" className="group relative">
          <span className="hover:text-black transition">LOG IN</span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Search */}
        <span className="group relative cursor-pointer">
          <span className="hover:text-black transition">SEARCH</span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>

        {/* Wishlist */}
        <span className="group relative cursor-pointer">
          <span className="hover:text-black transition">
            WISHLIST ({wishlistCount})
          </span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>

        {/* Cart with Bag Icon */}
        <span className="flex items-center gap-2 group relative cursor-pointer">
          <FaShoppingBag className="text-lg" />
          <span className="bg-pink-100 text-black text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-900 text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-center gap-4 md:hidden">
          {["HOME", "SHOP", "CONTACT", "LOG IN", "SEARCH", `WISHLIST (${wishlistCount})`].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase()}`}
              className="text-gray-900 font-bold hover:text-black"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {item}
            </Link>
          ))}

          {/* Cart in Mobile Menu */}
          <span className="flex items-center gap-2 cursor-pointer">
            <FaShoppingBag className="text-lg" />
            <span className="bg-pink-100 text-black text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
