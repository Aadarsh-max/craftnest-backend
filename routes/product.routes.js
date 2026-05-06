import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import {
  protect,
  sellerOnly,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, sellerOnly, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, sellerOnly, updateProduct)
  .delete(protect, sellerOnly, deleteProduct);

export default router;