import { getRecommendations } from "../services/recommendation.service.js";

export const fetchRecommendations = async (req, res) => {
  try {
    const { userId, mood } = req.body;
    const recommendations = await getRecommendations({ userId, mood });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
