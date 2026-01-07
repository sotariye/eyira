
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local manually since we are running a standalone script
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const apiKey = envConfig.GEMINI_API_KEY;

console.log("Testing with API Key ending in:", apiKey.slice(-4));

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    console.log(`Fetching model list from: ${url.replace(apiKey, 'HIDDEN_KEY')}...`);

    try {
        const resp = await fetch(url);
        const data = await resp.json();

        if (data.models) {
            console.log("\n--- Available Models for this Key ---");
            data.models.forEach(m => console.log(`- ${m.name}`));
            console.log("-------------------------------------\n");

            // Test with the first available model that looks like 'generateContent' supported
            const validModel = data.models.find(m => m.supportedGenerationMethods?.includes("generateContent"));
            if (validModel) {
                console.log(`Testing generation with discovered model: '${validModel.name}'...`);
                const modelName = validModel.name.replace('models/', ''); // remove prefix
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello?");
                console.log("Success! Response:", result.response.text());
            } else {
                console.log("No models found that support content generation.");
            }

        } else {
            console.log("No models returned. API Response:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Failed to list models via REST:", error);
    }
}

listModels();
