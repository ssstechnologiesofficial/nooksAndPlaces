import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const ShopFilterSection = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [price, setPrice] = useState(20000);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("http://localhost:5000/api/getCategories") // Update API URL if needed
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="w-full md:w-64 p-4 border-gray-300">
      <h2 className="text-xl font-bold mb-4">FILTERS</h2>

      {/* ✅ Category Filter (Dynamic) */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          <h3 className="text-lg font-semibold">CATEGORIES</h3>
          <motion.div
            animate={{ rotate: categoryOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown />
          </motion.div>
        </div>
        {categoryOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 space-y-2"
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <label key={category._id} className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-green-600" />
                  <span>{category.title}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </motion.div>
        )}
      </div>

      {/* ✅ Availability Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setAvailabilityOpen(!availabilityOpen)}
        >
          <h3 className="text-lg font-semibold">AVAILABILITY</h3>
          <motion.div
            animate={{ rotate: availabilityOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown />
          </motion.div>
        </div>
        {availabilityOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 space-y-2"
          >
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-green-600" />
              <span>In Stock (135)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-green-600" />
              <span>Out of Stock (18)</span>
            </label>
          </motion.div>
        )}
      </div>

      {/* ✅ Price Filter */}
      <div>
        <h3 className="text-lg font-semibold">PRICE</h3>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="41288"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-2 appearance-none h-2 bg-black rounded outline-none"
          />
          <div
            className="absolute top-[-20px] left-[calc(100%*(price/41288)-10px)] bg-white text-black text-xs px-2 py-1 rounded shadow"
            style={{ left: `${(price / 41288) * 100}%` }}
          >
            ₹{price}
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>₹0</span> <span>₹41,288</span>
        </div>
      </div>
    </div>
  );
};

export default ShopFilterSection;
