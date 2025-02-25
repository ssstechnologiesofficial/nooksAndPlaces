import React, { useState, useEffect } from "react";
import ShopFilterSection from "./ShopFilterSection";
import { Link } from "react-router-dom";


const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);  // State to store fetched products
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);      // State to handle any error

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getproducts'); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);  // Set fetched products to state
      } catch (error) {
        setError(error.message);  // Handle error
      } finally {
        setLoading(false);  // Set loading to false after the fetch is done
      }
    };

    fetchProducts();
  }, []);  // Empty dependency array to run the effect only once after the initial render

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error message if there is an error
  }
  const BASE_URL = 'http://localhost:5000/';
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
  <Link to={`/product/${product._id}`} key={index}>
    <div className="relative border rounded-md overflow-hidden shadow p-4">
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        Sale
      </span>
      <img
        src={`${BASE_URL}${product.images[0]}`}
        alt={product.productName}
        className="w-full h-80 object-cover"
      />
      <div className="text-center mt-2">
        <h3 className="text-lg font-semibold">{product.productName}</h3>
        <div className="flex justify-center gap-3">
          <div className="text-gray-500 line-through">₹{product.mrp}</div>
          <div className="text-red-500">₹{product.sellingPrice}</div>
        </div>
      </div>
    </div>
  </Link>
))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
