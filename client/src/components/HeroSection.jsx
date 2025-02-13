import React from "react";
import homePage from "../assets/homePage.jpg";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center text-white"
      style={{ backgroundImage: `url(${homePage})` }}
    >
      {/* Text Container - Centered in the middle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 px-12 py-6 rounded-lg text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Artisanal Aesthetic</h1>
      </div>

      {/* Button - Positioned at the bottom */}
      <button className="absolute bottom-10 px-6 py-3 bg-white text-black text-lg font-medium  hover:bg-gray-200 transition">
        Shop Now
      </button>
    </div>
  );
};

export default HeroSection;
