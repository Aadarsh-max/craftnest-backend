import express from "express";
import {
  getAllUsers,
  getAllProducts,
  approveProduct,
  verifySeller,
} from "../controllers/admin.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/products", protect, adminOnly, getAllProducts);

router.put("/products/:id/approve", protect, adminOnly, approveProduct);

router.put("/users/:id/verify", protect, adminOnly, verifySeller);

export default router;
