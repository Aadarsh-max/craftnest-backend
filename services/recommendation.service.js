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

  if (!products.length) {
    return [];
  }

  const productData = products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    category: product.category,
    moodTags: product.moodTags || [],
    price: product.price,
  }));

  const prompt = `
You are a recommendation AI.

Select the most relevant handmade products.

Mood: ${mood}
Region: ${user.region}

Products:
${JSON.stringify(productData)}

Return ONLY a valid JSON array of product IDs.

Example:
["id1","id2"]
`;

  let aiResponse = "";

  try {
    aiResponse = await generateAIResponse(prompt);
  } catch (error) {
    console.log(error);
    return [];
  }

  let recommendedIds = [];

  try {
    recommendedIds = JSON.parse(aiResponse);
  } catch (error) {
    console.log("JSON Parse Error:", aiResponse);
    recommendedIds = [];
  }

  const recommendedProducts = await Product.find({
    _id: {
      $in: recommendedIds,
    },
  });

  return recommendedProducts;
};
