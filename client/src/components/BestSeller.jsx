import React, { useState } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";

const products = [
  {
    id: 1,
    name: "Handcrafted Vase",
    price: "$49.99",
    discount: "20% OFF",
    mainImage: img1,
    images: [img1, img2, img3, img4],
  },
  {
    id: 2,
    name: "Wooden Lamp",
    price: "$59.99",
    discount: "15% OFF",
    mainImage: img2,
    images: [img2, img3, img4, img1],
  },
  {
    id: 3,
    name: "Ceramic Bowl",
    price: "$29.99",
    discount: "10% OFF",
    mainImage: img3,
    images: [img3, img1, img2, img4],
  },
  {
    id: 4,
    name: "Wall Decor",
    price: "$39.99",
    discount: "25% OFF",
    mainImage: img4,
    images: [img4, img1, img2, img3],
  },
];

const BestSeller = () => {
  const [selectedImages, setSelectedImages] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: product.mainImage }), {})
  );

  const handleImageChange = (productId, newImage) => {
    setSelectedImages((prev) => ({ ...prev, [productId]: newImage }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10 uppercase">
        Best Sellers
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-xl rounded-lg p-5 transform transition hover:scale-105">
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-lg">
              <img src={selectedImages[product.id]} alt={product.name} className="w-full h-72 object-cover rounded-lg" />
              
              {/* In Stock Badge */}
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                In Stock
              </span>

              {/* Discount Badge */}
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {product.discount}
              </span>
            </div>

            {/* Thumbnail Images */}
            <div className="flex justify-center gap-2 mt-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-14 h-14 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedImages[product.id] === img ? "border-black scale-105" : "border-gray-300"
                  }`}
                  onClick={() => handleImageChange(product.id, img)}
                />
              ))}
            </div>

            {/* Product Info */}
            <div className="text-center mt-5">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-xl font-bold text-gray-900">{product.price}</p>

              {/* Buy Now Button */}
              <button className="mt-4 px-6 py-3 bg-black text-white text-md font-medium  hover:bg-gray-800 transition duration-300 shadow-md">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
