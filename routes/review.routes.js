import express from "express";
import {
  createReview,
  getProductReviews,
} from "../controllers/review.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", getProductReviews);

router.post("/:id", protect, createReview);

export default router;