import client from "../../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/src/resources/responses/responses.js";

import fs from "fs/promises";

export async function getOpenAiPageAnalysis(
    textInput: string,
    imagesUrls: string[],
) {
    const prompt = await fs.readFile(
        "./src/services/pageReportPrompt.txt",
        "utf-8",
    );

    const imagesInputs: ResponseInputImage[] = imagesUrls.map((url) => {
        return {
            type: "input_image",
            image_url: url,
            detail: "auto",
        };
    });

    const inputsArray: ResponseInput = [
        {
            role: "developer",
            content: prompt,
        },
        {
            role: "user",
            content: [
                {
                    type: "input_text",
                    text: textInput,
                },
                ...imagesInputs,
            ],
        },
    ];

    const response = await client.responses.create({
        model: "gpt-4.1",
        instructions: prompt,
        input: inputsArray,
    });

    return response;
}
