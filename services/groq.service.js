import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export const generateAIResponse = async (prompt) => {
  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};