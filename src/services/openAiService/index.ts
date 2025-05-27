import client from "../../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/src/resources/responses/responses.js";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";

import fs from "fs/promises";

export async function getOpenAiPageAnalysis(pageScreenshotFilePath: string) {
    const prompt = await fs.readFile(
        "./src/services/pageReportPrompt.txt",
        "utf-8",
    );

    const base64ScreenshotImage = await fs.readFile(
        pageScreenshotFilePath,
        "base64",
    );

    const screenshotImageInput: ResponseInputImage = {
        type: "input_image",
        image_url: `data:image/png;base64,${base64ScreenshotImage}`,
        detail: "auto",
    };

    const inputsArray: ResponseInput = [
        {
            role: "developer",
            content: prompt,
        },
        {
            role: "user",
            content: [
                {
                    ...screenshotImageInput,
                },
            ],
        },
    ];

    const OutputFormat = z.object({
        titulo: z.string(),
        introducao: z.string(),
        pontosPositivos: z.object({
            textoInicial: z.string(),
            listaPontosPositivos: z.array(z.string()),
        }),
        pontosNegativos: z.object({
            textoInicial: z.string(),
            listaPontosNegativos: z.array(z.string()),
        }),
        sugestoesMelhorias: z.object({
            textoInicial: z.string(),
            listaSugestoesMelhorias: z.array(z.string()),
        }),
        descricaoImagens: z.array(z.string()),
        conclusao: z.string(),
    });

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
