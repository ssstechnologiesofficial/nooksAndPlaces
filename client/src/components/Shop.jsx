import React, { useState } from "react";
import ShopFilterSection from "./ShopFilterSection";
import pot1 from '../assets/pot1.png';
import pot2 from '../assets/pot2.png';
import pot3 from '../assets/pot3.png';
import pot4 from '../assets/pot4.png';
import pot5 from '../assets/pot5.png';
import pot6 from '../assets/pot6.png';
import pot7 from '../assets/pot7.png';
import pot8 from '../assets/pot8.png';

const products = [
  { image: pot1, name: "Elegant Ceramic Pot", originalPrice: 4000, sellingPrice: 2500 },
  { image: pot2, name: "Minimalist Plant Holder", originalPrice: 3500, sellingPrice: 2000 },
  { image: pot3, name: "Rustic Clay Vase", originalPrice: 5000, sellingPrice: 3000 },
  { image: pot4, name: "Modern White Pot", originalPrice: 4500, sellingPrice: 2800 },
  { image: pot5, name: "Classic Terracotta Pot", originalPrice: 3800, sellingPrice: 2200 },
  { image: pot6, name: "Handcrafted Garden Pot", originalPrice: 5500, sellingPrice: 3500 },
  { image: pot7, name: "Decorative Indoor Pot", originalPrice: 6000, sellingPrice: 4000 },
  { image: pot8, name: "Vintage Styled Pot", originalPrice: 4200, sellingPrice: 2600 }
];

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <button
          className="md:hidden bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className={`md:w-1/4 bg-white p-4 shadow rounded-md ${isFilterOpen ? "block" : "hidden"} md:block`}>
          <ShopFilterSection />
        </div>

        <div className="flex-1 bg-white p-4 md:p-6 shadow rounded-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">VIEW AS</span>
              <div className="flex gap-1">
                <button className="border px-3 py-1 rounded">▥</button>
                <button className="border px-3 py-1 rounded">▤</button>
                <button className="border px-3 py-1 rounded">▧</button>
                <button className="border px-3 py-1 rounded">▨</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <label className="text-sm font-medium">ITEMS PER PAGE</label>
              <select className="border px-3 py-1 rounded">
                <option>20</option>
                <option>40</option>
                <option>60</option>
              </select>
              <label className="text-sm font-medium">SORT BY</label>
              <select className="border px-3 py-1 rounded">
                <option>Best selling</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {products.map((product, index) => (
              <div key={index} className="relative border rounded-md overflow-hidden shadow p-4">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
                <div className="text-center mt-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="flex justify-center gap-3">
                    <div className="text-gray-500 line-through">₹{product.originalPrice}</div>
                    <div className="text-red-500">₹{product.sellingPrice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;