
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
console.log("Gemini Service Initializing. API Key present:", !!apiKey);

// Initialize the API client
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_INSTRUCTION = `You are the Eyira Kitchen Assistant. Your goal is to take the ingredients provided by the user and generate a quick, simple recipe that uses Eyira Smoky Jollof Base as the primary flavor agent.

Rules:

Always include 'Eyira Smoky Jollof Base' in the ingredients list.

Keep the recipe simple (under 30 mins if possible).

Tone: Modern, encouraging, and efficient (The 'Lazy Chef' vibe).

If the input is nonsense, playfully suggest they order a pizza or just make Jollof Rice.

Do NOT give hosting or relationship advice. Stick to cooking.`;



export const createChatSession = () => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_INSTRUCTION + " You are in the concierge chat. Keep it helpful, warm, and brief."
  });

  return model.startChat({
    history: [],
  });
};
