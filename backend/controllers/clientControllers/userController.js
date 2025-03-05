const UserModel = require("../../models/client/UserModel");

// ✅ Register a New User
exports.registerUser = async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;

        // Check if user already exists
        let user = await UserModel.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Create a new user
        user = new UserModel({ email, firstName, lastName, addresses: [] });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
  

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Add an Address to a User
exports.addAddress = async (req, res) => {
  try {
    const { id } = req.params; // User ID
    const { country, address1, address2, city, state, pin, mobile, default: isDefault } = req.body;

    let user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If the new address is marked as default, set other addresses' default to false
    if (isDefault) {
      user.addresses.forEach((addr) => (addr.default = false));
    }

    // Push new address
    user.addresses.push({ country, address1, address2, city, state, pin, mobile, default: isDefault });
    await user.save();

    res.status(201).json({ message: "Address added successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update an Address for a User
exports.updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updateData = req.body;

    let user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    // If the updated address is marked as default, update other addresses
    if (updateData.default) {
      user.addresses.forEach((addr) => (addr.default = false));
    }

    Object.assign(address, updateData);
    await user.save();

    res.status(200).json({ message: "Address updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete an Address
exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    let user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
