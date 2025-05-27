import client from "../../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/src/resources/responses/responses.js";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import sharp from "sharp";
import { OutputFormat } from "./outputSchema.js";

import fs from "fs/promises";

async function sliceScreenshot(pageScreenshotFilePath: string) {
    const image = sharp(pageScreenshotFilePath);
    const sliceHeight = 2048;
    const { width: imageWidth, height: imageHeight } = await image.metadata();

    const numberOfSlices = Math.floor(imageHeight / sliceHeight) + 1;
    const slices = new Array(numberOfSlices).fill(0);
    const imageRegions: sharp.Region[] = slices.map((_value, index) => {
        const isLastSlice = numberOfSlices === index + 1;
        const top = index * sliceHeight;
        const height = isLastSlice ? imageHeight - top : sliceHeight;
        const region = {
            top: top,
            height: height,
            left: 0,
            width: imageWidth,
        };
        return region;
    });

    const sliceImageArray = imageRegions.map(async (imageRegion) => {
        const result = await sharp(pageScreenshotFilePath)
            .extract(imageRegion)
            .toBuffer();

        return result.toString("base64");
    });

    return await Promise.all(sliceImageArray);
}

export async function getOpenAiPageAnalysis(pageScreenshotFilePath: string) {
    const prompt = await fs.readFile(
        "./src/services/pageReportPrompt.txt",
        "utf-8",
    );

    const slicedScreenshotImages = await sliceScreenshot(
        pageScreenshotFilePath,
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
