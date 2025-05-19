import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function askGenerativeAi(input: string) {
    const response = await client.responses.create({
        model: "gpt-4.1",
        input,
    });

    return response;
}
