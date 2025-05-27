import { scrapePageData } from "../scrapingService/index.js";
import { getOpenAiPageAnalysis } from "../openAiService/index.js";

export async function getPageReport(url: string) {
    const pageScreenshotFilePath = await scrapePageData(url);

    const pageAnalysis = await getOpenAiPageAnalysis(pageScreenshotFilePath);

    return {
        pageAnalysis,
        imageFilePath: pageScreenshotFilePath,
    };
}
