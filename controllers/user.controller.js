import User from "../models/User.js";
import Product from "../models/Product.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    user.region = req.body.region || user.region;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      region: updatedUser.region,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSellerProfile = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id).select(
      "-password"
    );

    if (!seller || seller.role !== "seller") {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    const products = await Product.find({
      seller: seller._id,
      isApproved: true,
    });

    res.json({
      seller,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};