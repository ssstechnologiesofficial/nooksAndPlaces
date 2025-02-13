import React, { useState, useEffect } from "react";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // Track category being edited

  // Fetch Categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getCategories");
      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort latest first
      setCategories(sortedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit or Update Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("banner", image);
    }

    try {
      const url = editingCategory
        ? `http://localhost:5000/api/updateCategory/${editingCategory._id}`
        : "http://localhost:5000/api/addCategory";

      const response = await fetch(url, {
        method: editingCategory ? "PUT" : "POST",
        body: formData,
      });

      if (response.ok) {
        alert(editingCategory ? "Category updated successfully" : "Category added successfully");
        setTitle("");
        setImage(null);
        setPreview(null);
        setEditingCategory(null);
        fetchCategories(); // Refresh category list
      } else {
        alert("Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Handle Edit Click
  const handleEdit = (category) => {
    setTitle(category.title);
    setPreview(`http://localhost:5000${category.banner}`);
    setEditingCategory(category);
  };

  // Handle Delete Category
  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/deleteCategory/${categoryId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Category deleted successfully");
          fetchCategories(); // Refresh category list
        } else {
          alert("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{editingCategory ? "Edit Category" : "Add New Category"}</h2>
      
      {/* ✅ Form Section */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category Title</label>
          <input
            type="text"
            placeholder="Enter Category Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category Image</label>
          <input
            type="file"
            className="w-full border p-3 rounded-lg"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="flex justify-center">
            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-4" />
          </div>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* ✅ Categories List Section */}
      <h2 className="text-xl font-bold mb-4 text-center">Categories List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={`http://localhost:5000${category.banner}`}
                      alt={category.title}
                      className="w-12 h-12 object-cover  mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{category.title}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(category.createdAt).toLocaleDateString()} {/* Format Date */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                  No categories added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCategory;
