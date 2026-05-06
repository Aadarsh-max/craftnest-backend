import express from "express";
import { fetchRecommendations } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/recommendations", protect, fetchRecommendations);

export default router;