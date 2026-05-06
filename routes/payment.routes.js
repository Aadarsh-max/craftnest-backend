import express from "express";
import { updateOrderToPaid } from "../controllers/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/:id/pay", protect, updateOrderToPaid);

export default router;