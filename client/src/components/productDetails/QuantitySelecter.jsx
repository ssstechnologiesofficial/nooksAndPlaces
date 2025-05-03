import React from "react";

const QuantitySelector = ({ quantity, incrementQty, decrementQty }) => {
  return (
    <div className="mt-6 flex items-center gap-4">
      <p className="text-lg font-medium">Quantity:</p>
      <div className="flex items-center border px-2 py-1 rounded-md">
        <button className="px-2 text-lg" onClick={decrementQty}>
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button className="px-2 text-lg" onClick={incrementQty}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
