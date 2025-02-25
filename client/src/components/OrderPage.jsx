import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrderPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ✅ Get user email from localStorage
    const userEmail = localStorage.getItem("email");

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
  

            {/* Order Section */}
            <div className="w-full flex-col min-h-[60vh] px-32 py-5">
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
