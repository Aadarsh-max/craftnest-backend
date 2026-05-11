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
    id: product._id.toString(),
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

Return ONLY a JSON array of recommended product IDs.

Example:
["id1","id2"]
`;

  const aiResponse = await generateAIResponse(prompt);

  let recommendedIds = [];

  try {
    recommendedIds = JSON.parse(aiResponse);
  } catch (error) {
    recommendedIds = [];
  }

  const recommendedProducts = await Product.find({
    _id: {
      $in: recommendedIds,
    },
  });

  return recommendedProducts;
};
