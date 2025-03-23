import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "deepseek-reasoner",
        });

        return NextResponse.json({
            content: completion.choices[0].message.content,
            role: completion.choices[0].message.role,
        });
    } catch (error) {
        console.error("Error in DeepSeek API:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}