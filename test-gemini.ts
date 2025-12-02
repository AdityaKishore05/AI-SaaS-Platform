import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from 'fs';

dotenv.config();

function log(message: string) {
    console.log(message);
    fs.appendFileSync('test-output.txt', message + '\n');
}

async function main() {
    fs.writeFileSync('test-output.txt', ''); // Clear file
    try {
        log("Testing Gemini API Key...");
        const apiKey = process.env.GOOGLE_AI_KEY;
        log("Key present: " + !!apiKey);

        if (!apiKey) {
            throw new Error("GOOGLE_AI_KEY is missing");
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        log("Trying gemini-2.0-flash...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = await model.generateContent("Hello");
            log("gemini-2.0-flash worked!");
            log(result.response.text());
            return;
        } catch (e: any) {
            log("gemini-2.0-flash failed: " + e.message);
        }

        log("Trying gemini-flash-latest...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const result = await model.generateContent("Hello");
            log("gemini-flash-latest worked!");
            log(result.response.text());
            return;
        } catch (e: any) {
            log("gemini-flash-latest failed: " + e.message);
        }

    } catch (error: any) {
        log("Critical Error: " + error.message);
    }
}

main();
