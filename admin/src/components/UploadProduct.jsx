import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const UploadProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    mrp: "",
    sellingPrice: "",
    description: "",
    size: "",
    vendor: "",
    productType: "",
    images: [],
    addToCart: false,
    wishlist: false,
    availability: true,
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("mrp", formData.mrp);
    data.append("sellingPrice", formData.sellingPrice);
    data.append("description", formData.description);
    data.append("size", formData.size);
    data.append("vendor", formData.vendor);
    data.append("productType", formData.productType);
    data.append("addToCart", formData.addToCart);
    data.append("wishlist", formData.wishlist);
    data.append("availability", formData.availability);
    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/uploadProduct",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Product uploaded successfully");
      setShowForm(false);
      setFormData({
        productName: "",
        mrp: "",
        sellingPrice: "",
        description: "",
        size: "",
        vendor: "",
        productType: "",
        images: [],
        addToCart: false,
        wishlist: false,
        availability: true,
      });
      setImagePreviews([]);
    } catch (error) {
      console.error(error);
      alert("Failed to upload product");
    }
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getproducts");
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const BASE_URL = "http://localhost:5000/";

  return (
    <>
      <div className="bg-[#919DA6] p-4 m-0 rounded-md">
        <button
          className="text-white text-left bg-gray-700 p-2 shadow-xl rounded-md"
          onClick={() => setShowForm(!showForm)}
        >
          Upload Product
        </button>

        {showForm && (
          <form
            className="bg-white p-4 rounded-md mt-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label>MRP</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label>Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label>Size</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                placeholder="Comma-separated sizes (e.g., S,M,L)"
              />
            </div>

            <div className="mb-2">
              <label>Vendor</label>
              <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label>Product Type</label>
              <input
                type="text"
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label>Upload Multiple Images</label>
              <input
                type="file"
                multiple
                onChange={handleMultipleImagesChange}
                className="border p-2 w-full rounded-md"
              />
            </div>

            <div className="mb-2 flex flex-wrap">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 object-cover m-1 border rounded-md"
                />
              ))}
            </div>

            {/* <div className="mb-2">
              <label>Add to Cart</label>
              <input
                type="checkbox"
                checked={formData.addToCart}
                onChange={() => setFormData({ ...formData, addToCart: !formData.addToCart })}
              />
            </div>

            <div className="mb-2">
              <label>Wishlist</label>
              <input
                type="checkbox"
                checked={formData.wishlist}
                onChange={() => setFormData({ ...formData, wishlist: !formData.wishlist })}
              />
            </div> */}

            <div className="mb-2 ">
              <label>Availability</label>
              <input
                type="checkbox"
                checked={formData.availability}
                onChange={() =>
                  setFormData({
                    ...formData,
                    availability: !formData.availability,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
            >
              Submit
            </button>
          </form>
        )}
      </div>

      {/* 
      //ejfoipwerjfojeropfjropfjo */}

<div className="p-4 m-0 rounded-md text-white">
  <h2 className="text-2xl text-black mb-4">Uploaded Products :</h2>

  {products.length === 0 ? (
    <p>No products uploaded yet.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white p-4 rounded-md shadow-md text-black"
        >
          {/* Center the image */}
          {product.images.length > 0 && (
            <div className="flex justify-center items-center">
              <img
                src={`${BASE_URL}${product.images[0]}`}
                alt="Product"
                className="w-32 h-32 object-cover mb-2 border rounded"
              />
            </div>
          )}
          <h3 className="text-lg font-bold text-center">{product.productName}</h3>
          <div className="flex justify-evenly">
            <div className="bg-red-700 rounded-full p-1">
              <MdDeleteOutline className="text-white text-md" />
            </div>
            <div className="bg-green-700 rounded-full p-1">
              <MdOutlineEdit className="text-white text-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </>
  );
};

export default UploadProduct;
