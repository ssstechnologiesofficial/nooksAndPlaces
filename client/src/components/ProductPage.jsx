import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiHeart, CiShare2 } from "react-icons/ci";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLiked, setIsLiked] = useState(false); // State to hold the hover effect

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getproduct/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
        if (data.images.length > 0) {
          setSelectedImage(`${BASE_URL}/${data.images[0].replace(/^\/+/, "")}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section - Images */}
        <div className="md:w-1/2">
          <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
            Sale
          </span>
          <img
            src={selectedImage}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-md border mt-4"
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((img, index) => {
              const imgSrc = `${BASE_URL}/${img.replace(/^\/+/, "")}`;
              return (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer border ${
                    selectedImage === imgSrc ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(imgSrc)}
                />
              );
            })}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="md:w-1/2 mt-6">
          <h1 className="text-3xl font-semibold">{product.productName}</h1>
          <p className="mt-2 text-gray-600">
            A part of our eclectic mix of home accessories...
          </p>
          <div className="flex gap-4 mt-2 items-center">
            <span className="text-gray-500 line-through text-lg">
              Rs. {product.mrp}
            </span>
            <span className="text-red-500 text-2xl font-bold">
              Rs. {product.sellingPrice}
            </span>
          </div>
          <p className="mt-4 text-gray-700">
            <strong>Vendor:</strong> {product.vendor}
          </p>
          <p className="text-gray-700">
            <strong>Availability:</strong> In Stock
          </p>
          <p className="text-gray-700">
            <strong>Product Type:</strong> {product.productType}
          </p>
          <p className="text-gray-700">
            <strong>Product Type:</strong> {product.size}
          </p>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-lg font-medium">Quantity:</p>
            <div className="flex items-center border px-2 py-1 rounded-md">
              <button className="px-2 text-lg">-</button>
              <span className="mx-2">1</span>
              <button className="px-2 text-lg">+</button>
            </div>
          </div>

          <p className="mt-4 text-lg font-semibold">
            Subtotal: Rs. {product.sellingPrice}
          </p>

          {/* Icons */}
          <div className="flex items-center gap-7 mt-4">
            <button className="mt-6 bg-black text-white px-6 py-3 border border-black w-1/2 text-lg transition-all duration-300 ease-in-out hover:text-black hover:bg-white">
              ADD TO CART
            </button>

            {/* Like Icon */}
            <div
              className={`text-4xl border border-gray-400 rounded-full p-2 mt-3 cursor-pointer transition-all duration-300 ${
                isLiked ? "bg-black text-white border-black" : "hover:bg-black hover:text-white"
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <CiHeart />
            </div>

            {/* Share Icon */}
            <CiShare2 className="text-2xl mt-3 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
