import User from "../models/User.js";
import Product from "../models/Product.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isApproved = true;
    await product.save();

    res.json({ message: "Product approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifySeller = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== "seller") {
      return res.status(404).json({ message: "Seller not found" });
    }

    user.isVerifiedSeller = true;
    await user.save();

    res.json({ message: "Seller verified" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
