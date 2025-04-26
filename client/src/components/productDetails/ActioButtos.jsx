import React from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";

const ActionButtons = ({ handleAddToCart, handleAddToWishlist, isLiked }) => {
  return (
    <div className="flex items-center gap-7 mt-4">
      <button
        onClick={handleAddToCart}
        className="mt-6 bg-black text-white px-6 py-3 border border-black w-1/2 text-lg transition-all duration-300 ease-in-out hover:text-black hover:bg-white"
      >
        ADD TO CART
      </button>

      {/* Like Icon */}
      <div
        className={`text-4xl border border-gray-400 rounded-full p-2 mt-3 cursor-pointer transition-all duration-300 ${
          isLiked
            ? "bg-black text-white border-black"
            : "hover:bg-black hover:text-white"
        }`}
        onClick={handleAddToWishlist}
      >
        <CiHeart />
      </div>

      {/* Share Icon */}
      <CiShare2 className="text-2xl mt-3 cursor-pointer" />
    </div>
  );
};

export default ActionButtons;
