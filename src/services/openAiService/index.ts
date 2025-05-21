import client from "../../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/src/resources/responses/responses.js";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";

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
        descricaoImagens: z.array(
            z.object({
                urlImagem: z.string(),
                descricaoImagem: z.string(),
            }),
        ),
        conclusao: z.string(),
    });

    const response = await client.responses.parse({
        model: "gpt-4.1",
        instructions: prompt,
        input: inputsArray,
        text: {
            format: zodTextFormat(OutputFormat, "relatório"),
        },
    });

    return response.output_parsed;
}
