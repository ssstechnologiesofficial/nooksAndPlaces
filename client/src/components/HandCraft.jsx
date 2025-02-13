import React from "react";
import homeImg2 from "../assets/homeImg2.webp";

const TerracottaCollection = () => {
  return (
    <div className="w-full">
      {/* Heading */}
      <h1 className="text-center text-4xl font-bold text-gray-800 mt-14 mb-10">
        Terracotta Collection
      </h1>

      {/* Background Image Section */}
      <div
        className="relative w-full h-[50vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${homeImg2})` }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Centered Content */}
        <div className="relative text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold">Timeless Terracotta</h2>
          <p className="text-lg md:text-xl mt-2">
            Discover handcrafted pieces that add warmth and elegance to any space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TerracottaCollection;
