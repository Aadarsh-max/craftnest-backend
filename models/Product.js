import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      required: true,
    },

    moodTags: [
      {
        type: String, // e.g., "festive", "minimal", "rustic"
      },
    ],

    region: {
      type: String, // city/state for hyperlocal filtering
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ratings: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isApproved: {
      type: Boolean,
      default: true, // admin verification
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
