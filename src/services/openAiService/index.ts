import client from "../../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/src/resources/responses/responses.js";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { OutputFormat } from "./outputSchema.js";
import imageSlicer from "./imageSlicer.js";

import fs from "fs/promises";

export async function getOpenAiPageAnalysis(pageScreenshotFilePath: string) {
    const prompt = await fs.readFile(
        "./src/services/pageReportPrompt.txt",
        "utf-8",
    );

    const slicedScreenshotImages = await imageSlicer(
        pageScreenshotFilePath,
        2048,
    );

    const imagesInputs: ResponseInputImage[] = slicedScreenshotImages.map(
        (base64Image) => {
            return {
                type: "input_image",
                image_url: `data:image/png;base64,${base64Image}`,
                detail: "high",
            };
        },
    );

    const inputsArray: ResponseInput = [
        {
            role: "developer",
            content: prompt,
        },
        {
            role: "user",
            content: [...imagesInputs],
        },
    ];

    const response = await client.responses.parse({
        model: "gpt-4.1",
        instructions: prompt,
        input: inputsArray,
        text: {
            format: zodTextFormat(OutputFormat, "relatorio"),
        },
    });

    return response.output_parsed;
}
