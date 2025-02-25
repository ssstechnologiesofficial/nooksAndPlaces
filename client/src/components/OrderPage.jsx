import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrderPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "karishmadawar123@gmail.com";

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-lg px-32 py-6 flex justify-between items-center">
                {/* Left Side: Logo + Nav Links */}
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-bold text-gray-800">Nooks & Places</h1>
                    <Link to="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
                    <Link to="/orders" className="text-gray-700 hover:text-blue-600">Orders</Link>
                </div>

                {/* Right Side: Profile Icon & Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    {/* Profile Icon & Dropdown Toggle */}
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <FaUserCircle className="text-3xl text-gray-700" />
                        {isDropdownOpen ? (
                            <FaChevronUp className="text-gray-500" />
                        ) : (
                            <FaChevronDown className="text-gray-500" />
                        )}
                    </div>

                    {/* Dropdown Menu (Positioned Below) */}
                    {isDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md w-64 py-2 border border-gray-200">
                            {/* Profile Section (Icon + Email) */}
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-300">
                                <FaUserCircle className="text-2xl text-gray-700" />
                                <p className="text-sm text-gray-800">{userEmail}</p>
                            </div>
                            {/* Options */}
                            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                            <button
                                onClick={() => console.log("Logging Out")}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Order Section */}
            <div className=" w-full flex-col min-h-[60vh] px-32 my-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h2>
                <div className="bg-white shadow-md p-6 rounded-lg w-full text-center">
                    <p className="text-gray-600">No orders yet</p>
                    <p className="text-gray-500 mt-1">Go to store to place an order.</p>
                  
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
