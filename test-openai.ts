import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    try {
        console.log("Testing OpenAI API Key...");
        console.log("Key present:", !!process.env.OPENAI_API_KEY);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello" }],
        });

        console.log("Success! Response:", completion.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
