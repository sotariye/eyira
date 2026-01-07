
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
console.log("Gemini Service Initializing. API Key present:", !!apiKey);

// Initialize the API client
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_INSTRUCTION = `You are the Culinary Host for Eyira. 
Eyira makes a premium Smoky Jollof Base for high-achieving diasporans and busy professionals.
Our philosophy: We didn't change the recipe; we just fixed the process. Authentic smoke without the sweating.
Tone: Confident, hospitable, and helpful. Avoid clinical "tech" language. Avoid "metrics" or "status". 
Focus on: Taste, Effortless Hosting, and Results.
Cooking: Jar + 3 cups rice + 2 cups water -> Oven (350F) -> 60 Mins.
Ingredients: Slow-toasted tomato reduction (6 hours), firewood smoke infusion, plant-based glaze.
Help users with: Dinner party ideas, portion sizes for guests, and what proteins to serve on the side.
Support: If a user has an issue (broken jar, shipping), direct them to email shopeyira@gmail.com.`;

export const getFastRecipeSuggestion = async (query: string): Promise<string> => {
  try {
    // For text-only input, use the specific version
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(query);
    const response = await result.response;
    return response.text() || "I'm here to help. What's on the menu?";
  } catch (error) {
    console.error("Fast API Error:", error);
    return `Error: ${(error as any).message || "The kitchen is currently busy."}`;
  }
};

export const getComplexRecipeSuggestion = async (query: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const result = await model.generateContent(query);
    const response = await result.response;
    return response.text() || "I'm reviewing your request. One moment.";
  } catch (error) {
    console.error("Pro API Error:", error);
    return "Our lead host is away. How else can I assist?";
  }
};

export const createChatSession = () => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_INSTRUCTION + " You are in the concierge chat. Keep it helpful, warm, and brief."
  });

  return model.startChat({
    history: [],
  });
};
