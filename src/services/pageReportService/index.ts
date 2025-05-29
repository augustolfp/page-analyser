import { scrapePageData } from "../scrapingService/index.js";
import { getOpenAiPageAnalysis } from "../openAiService/index.js";
import shortid from "shortid";
import createPdf from "../pdfService/index.js";

export async function getPageReport(url: string) {
    const pageScreenshotFilePath = await scrapePageData(url);

    const pageAnalysis = await getOpenAiPageAnalysis(pageScreenshotFilePath);

    const reportFilePath = await createPdf(
        `${shortid.generate()}`,
        pageAnalysis,
    );

    return {
        reportFilePath: reportFilePath,
        imageFilePath: pageScreenshotFilePath,
    };
}
