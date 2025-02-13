import React from "react";
import newArrival1 from "../assets/newArrival1.webp";
import newArrival2 from "../assets/newArrival2.jpg";

const NewArrival = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
        New Arrivals
      </h1>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full">
          <img
            src={newArrival1}
            alt="New Arrival 1"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="w-full">
          <img
            src={newArrival2}
            alt="New Arrival 2"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
