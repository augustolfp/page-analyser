import { scrapePageData } from "../scrapingService/index.js";
import { getOpenAiPageAnalysis } from "../openAiService/index.js";

export async function getPageReport(url: string) {
    const { productsByCategory } = await scrapePageData(url);

    const imagesArray: string[] = [];
    productsByCategory.map(({ products }) => {
        return products.map(({ imageSrc }) => imagesArray.push(imageSrc));
    });

    const formatInput = productsByCategory.map(({ title, products }) => {
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

    console.log(formatInput);
    console.log(imagesArray);

    const pageAnalysis = await getOpenAiPageAnalysis(
        JSON.stringify(formatInput),
        imagesArray,
    );

    console.log(pageAnalysis);

    return;
}
