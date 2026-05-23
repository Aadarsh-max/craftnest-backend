import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { generateAIResponse } from "./groq.service.js";

export const getRecommendations = async ({ userId, mood }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Bug 1 fixed — region is optional
  const query = { isApproved: true };
  if (user.region) query.region = user.region;
  const products = await Product.find(query).limit(20);

  if (!products.length) return [];

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
Region: ${user.region || "any"}
Products:
${JSON.stringify(productData)}
Return ONLY a valid JSON array of product IDs, no markdown, no explanation.
Example: ["id1","id2"]
`;

  let aiResponse = "";
  try {
    aiResponse = await generateAIResponse(prompt);
  } catch (error) {
    console.log("Groq error:", error);
    return [];
  }

  let recommendedIds = [];
  try {
    // Bug 2 fixed — strip markdown fences
    const cleaned = aiResponse.replace(/```json|```/g, "").trim();
    recommendedIds = JSON.parse(cleaned);
  } catch (error) {
    console.log("JSON Parse Error:", aiResponse);
    return [];
  }

  // Bug 3 fixed — convert to ObjectId
  const recommendedProducts = await Product.find({
    _id: {
      $in: recommendedIds.map((id) => new mongoose.Types.ObjectId(id)),
    },
  });

  return recommendedProducts;
};
