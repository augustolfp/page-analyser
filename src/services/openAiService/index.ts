import client from "../../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/resources/responses/responses.mjs";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { OutputFormat } from "./outputSchema.js";
import imageSlicer from "./imageSlicer.js";
import ora from "ora";
import fs from "fs/promises";
import { z } from "zod";

type Content = z.infer<typeof OutputFormat>;

export async function getOpenAiPageAnalysis(
    pageScreenshotFilePath: string,
): Promise<Content> {
    const prompt = await fs.readFile(
        "./src/services/openAiService/pageReportPrompt.txt",
        "utf-8",
    );

    const input = await prepareInput(pageScreenshotFilePath);

    const waitApiResponse = ora("Aguardando resposta da OpenAI API").start();

    const response = await client.responses.parse({
        model: "gpt-4.1",
        instructions: prompt,
        input: input,
        text: {
            format: zodTextFormat(OutputFormat, "relatorio"),
        },
    });

    waitApiResponse.succeed();

    return response.output_parsed as Content;
}

async function prepareInput(
    pageScreenshotFilePath: string,
): Promise<ResponseInput> {
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

    return [
        {
            role: "user",
            content: [...imagesInputs],
        },
    ];
}
