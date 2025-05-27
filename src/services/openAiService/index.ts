import client from "../../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/src/resources/responses/responses.js";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { OutputFormat } from "./outputSchema.js";
import imageSlicer from "./imageSlicer.js";
import ora from "ora";

import fs from "fs/promises";

export async function getOpenAiPageAnalysis(pageScreenshotFilePath: string) {
    const importingPrompt = ora("Importanto arquivo de prompt").start();

    const prompt = await fs.readFile(
        "./src/services/openAiService/pageReportPrompt.txt",
        "utf-8",
    );

    importingPrompt.succeed();

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

    return response.output_parsed;
}

async function prepareInput(
    pageScreenshotFilePath: string,
): Promise<ResponseInput> {
    const preparingInput = ora("Fatiando screenshot verticalmente").start();

    const slicedScreenshotImages = await imageSlicer(
        pageScreenshotFilePath,
        2048,
    );

    preparingInput.succeed(
        `Screenshot fatiado com sucesso. ${slicedScreenshotImages.length} fatias verticais.`,
    );

    const formattingInput = ora(
        "Formatando array de fatias para a OpenAI API",
    ).start();

    const imagesInputs: ResponseInputImage[] = slicedScreenshotImages.map(
        (base64Image) => {
            return {
                type: "input_image",
                image_url: `data:image/png;base64,${base64Image}`,
                detail: "high",
            };
        },
    );

    formattingInput.succeed();

    return [
        {
            role: "user",
            content: [...imagesInputs],
        },
    ];
}
