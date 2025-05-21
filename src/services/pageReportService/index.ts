import { scrapePageData } from "../scrapingService/index.js";
import { getOpenAiPageAnalysis } from "../openAiService/index.js";
import type { ProductsCategory } from "../../types/index.js";

export async function getPageReport(url: string) {
    const { productsByCategory } = await scrapePageData(url);

    const imagesArray = getImagesArray(productsByCategory);
    const formattedTextInput = getFormattedTextInput(productsByCategory);

    const pageAnalysis = await getOpenAiPageAnalysis(
        JSON.stringify(formattedTextInput),
        imagesArray,
    );

    const imagesWithDescription = pageAnalysis?.descricaoImagens.map(
        (descricao, index) => {
            return {
                url: imagesArray[index],
                descricao,
            };
        },
    );

    return {
        pageAnalysis,
        productsByCategory,
        imagesWithDescription,
    };
}

function getImagesArray(productsByCategory: ProductsCategory[]): string[] {
    const imagesArray: string[] = [];
    productsByCategory.map(({ products }) => {
        return products.map(({ imageSrc }) => imagesArray.push(imageSrc));
    });

    return imagesArray;
}

function getFormattedTextInput(productsByCategory: ProductsCategory[]): string {
    const formattedInput = productsByCategory.map(({ title, products }) => {
        const formatProducts = products.map(({ title, description }) => {
            return {
                nome: title,
                descricao: description,
            };
        });

        return {
            categoria: title,
            produtos: formatProducts,
        };
    });

    return JSON.stringify(formattedInput);
}
