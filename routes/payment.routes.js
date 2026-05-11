import express from "express";
import {
  updateOrderToPaid,
  createCheckoutSession,
} from "../controllers/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session/:id", protect, createCheckoutSession);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
