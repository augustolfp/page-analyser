import { PageData } from "../types/index.js";
import { scrapePageData } from "./scrapingService/index.js";
import client from "../config/openAI.js";

export async function getPageReport(url: string) {
    const pageData = await scrapePageData(url);

    return;
}
