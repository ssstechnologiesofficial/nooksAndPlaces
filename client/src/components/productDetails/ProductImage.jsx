import React from "react";

const ProductImages = ({ selectedImage, images, setSelectedImage, BASE_URL, productName }) => {
  return (
    <div className="md:w-1/2">
      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
        Sale
      </span>
      <img
        src={selectedImage}
        alt={productName}
        className="w-full h-96 object-cover rounded-md border mt-4"
      />
      <div className="flex gap-2 mt-4">
        {images.map((img, index) => {
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
  );
};

export default ProductImages;
