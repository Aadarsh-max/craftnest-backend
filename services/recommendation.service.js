import User from "../models/User.js";
import Product from "../models/Product.js";
import { generateAIResponse } from "./groq.service.js";

export const getRecommendations = async ({ userId, mood }) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const products = await Product.find({
    isApproved: true,
    region: user.region,
  }).limit(20);

  const productData = products.map((product) => ({
    id: product._id,
    name: product.name,
    category: product.category,
    moodTags: product.moodTags,
    price: product.price,
  }));

  const prompt = `
    Recommend the best handmade products for this user.

    User Region: ${user.region}
    Preferred Mood: ${mood}

    Products:
    ${JSON.stringify(productData)}

    Return only recommended product IDs as JSON array.
  `;

  const aiResponse = await generateAIResponse(prompt);

  return {
    recommendations: aiResponse,
  };
};
