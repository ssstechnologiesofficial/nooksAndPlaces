import React from "react";
import homeImg2 from "../assets/homeImg2.webp";

const TerracottaCollection = () => {
  return (
    <div className="w-full">
      {/* Heading */}
      <h1 className="text-center text-4xl  text-gray-800 mt-14 mb-10">
        Terracotta Collection
      </h1>

    
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${homeImg2})` }}
      >
        {/* Optional Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      
      </div>
    </div>
  );
};

export default TerracottaCollection;
