import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div>
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
        <strong>Size:</strong> {product.size}
      </p>
    </div>
  );
};

export default ProductDetails;
