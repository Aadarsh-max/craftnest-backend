import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getSellerProfile,
  getAllSellers,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/sellers", getAllSellers);
router.get("/seller/:id", getSellerProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
