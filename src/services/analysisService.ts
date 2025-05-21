import fs from "fs/promises";
import { scrapePageData } from "./scrapingService/index.js";
import client from "../config/openAI.js";
import type {
    ResponseInput,
    ResponseInputImage,
} from "openai/src/resources/responses/responses.js";

export async function getPageReport(url: string) {
    const { productsByCategory } = await scrapePageData(url);

    const imagesArray: string[] = [];
    productsByCategory.map(({ products }) => {
        return products.map(({ imageSrc }) => imagesArray.push(imageSrc));
    });

    const imagesInputs: ResponseInputImage[] = imagesArray.map((imageUrl) => {
        return {
            type: "input_image",
            image_url: imageUrl,
            detail: "auto",
        };
    });

    const formatInput = productsByCategory.map(({ title, products }) => {
        const formatProducts = products.map(({ title, description }) => {
            return {
                nome: title,
                descricao: description.replace("\n", " "),
            };
        });

        return {
            categoria: title,
            produtos: formatProducts,
        };
    });

    const prompt = await fs.readFile(
        "./src/services/pageReportPrompt.txt",
        "utf-8",
    );

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
                    text: JSON.stringify(formatInput),
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

    return;
}
