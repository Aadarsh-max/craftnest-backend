import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Use Cloudinary direct upload from frontend",
  });
});

export default router;