import puppeteer from "puppeteer";
import type { PageData } from "../../types/index.js";
import { getAllProducts } from "./productService.js";

export async function scrapePageData(url: string): Promise<PageData> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const productsByCategory = await getAllProducts(page);

    await browser.close();

    return {
        productsByCategory,
    };
}
