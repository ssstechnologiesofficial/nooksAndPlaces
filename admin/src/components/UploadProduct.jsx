import React, { useState } from 'react';
import axios from 'axios';
import UploadedProductsList from './UploadedProductsList';

const UploadProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    mrp: '',
    sellingPrice: '',
    description: '',
    img: null,
    images: [],
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
    data.append('productName', formData.productName);
    data.append('mrp', formData.mrp);
    data.append('sellingPrice', formData.sellingPrice);
    data.append('description', formData.description);
    formData.images.forEach((image) => {
      data.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/uploadProduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Product uploaded successfully');
      setShowForm(false);
      setFormData({
        productName: '',
        mrp: '',
        sellingPrice: '',
        description: '',
        img: null,
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      console.error(error);
      alert('Failed to upload product');
    }
  };

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
        <form className="bg-white p-4 rounded-md mt-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="border p-1 w-full"
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
              className="border p-1 w-full"
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
              className="border p-1 w-full"
              required
              />
          </div>

          <div className="mb-2">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-1 w-full"
              required
              ></textarea>
          </div>

          <div className="mb-2">
            <label>Upload Multiple Images</label>
            <input type="file" multiple onChange={handleMultipleImagesChange} />
          </div>

          <div className="mb-2 flex flex-wrap">
            {imagePreviews.map((preview, index) => (
              <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="w-16 h-16 object-cover m-1 border"
              />
            ))}
          </div>

          <button type="submit" className="bg-blue-500 text-white p-1 rounded-md">
            Submit
          </button>
        </form>
      )}

    </div>

    <UploadedProductsList/>
      </>
  );
};

export default UploadProduct;
