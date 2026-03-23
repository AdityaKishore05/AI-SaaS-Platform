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
            // Removed 'return;' here to allow subsequent tests to run

            log("Trying gemini-flash-lite-latest...");
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
                const result = await model.generateContent("Hello");
                log("gemini-flash-lite-latest worked!");
            } catch (e: any) {
                log("gemini-flash-lite-latest failed: " + e.message);
            }

            log("Trying gemini-2.5-flash...");
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                const result = await model.generateContent("Hello");
                log("gemini-2.5-flash worked!");
            } catch (e: any) {
                log("gemini-2.5-flash failed: " + e.message);
            }

        } catch (e: any) {
            log("gemini-2.0-flash failed: " + e.message);
        }

        log("Trying gemini-1.5-flash...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent("Hello");
            log("gemini-1.5-flash worked!");
        } catch (e: any) {
            log("gemini-1.5-flash failed: " + e.message);
        }

        log("Fetching list of available models...");
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const data = await response.json();
            if (data.models) {
                log("Available models supporting generateContent:");
                data.models.forEach((m: any) => {
                    if (m.supportedGenerationMethods?.includes("generateContent")) {
                        log("- " + m.name);
                    }
                });
            } else {
                log("Failed to list models: " + JSON.stringify(data));
            }
        } catch (e: any) {
            log("Fetch failed: " + e.message);
        }

    } catch (error: any) {
        log("Critical Error: " + error.message);
    }
}

main();
