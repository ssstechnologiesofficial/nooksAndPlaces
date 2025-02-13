const Category = require("../models/categoryModel");

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const banner = req.file ? `/uploads/${req.file.filename}` : "";

    console.log("Adding new category with data:", { title, banner });

    const category = new Category({ title, banner });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Error saving category data." });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories." });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const banner = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { title };
    if (banner) updatedData.banner = banner;

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: "Error updating category." });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting category." });
  }
};

// Get total count of categories
exports.getTotalCategories = async (req, res) => {
  try {
    const totalCount = await Category.countDocuments();

    res.status(200).json({ total: totalCount });
  } catch (err) {
    res.status(500).json({ error: "Error counting categories." });
  }
};
