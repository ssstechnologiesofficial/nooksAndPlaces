import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const LoggedInNavbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        navigate("/"); // Redirect to Home after logout
        window.location.reload(); // Refresh UI
    };

    return (
        <nav className="bg-white shadow-lg px-32 py-6 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold text-gray-800">Nooks & Places</h1>
                <Link to="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
                <Link to="/orders" className="text-gray-700 hover:text-blue-600">Orders</Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            </div>

            <div className="relative" ref={dropdownRef}>
                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer">
                    <FaUserCircle className="text-3xl text-gray-700" />
                    {isDropdownOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </div>

                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md w-64 py-2 border border-gray-200">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-300">
                            <FaUserCircle className="text-2xl text-gray-700" />
                            <p className="text-sm text-gray-800">{userEmail || "Guest"}</p>
                        </div>
                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default LoggedInNavbar;
