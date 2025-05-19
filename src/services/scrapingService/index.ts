import puppeteer from "puppeteer";
import type { PageData } from "../../types/index.js";
import { getAllProductsByCategory } from "./productService.js";

export async function scrapePageData(url: string): Promise<PageData> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const handles = await page.$$(".pd-prd-group, pd-prd-group-loop");

    const categories = await Promise.all(
        handles.map((handle) => getAllProductsByCategory(handle)),
    );

    await browser.close();

    return {
        categories,
    };
}
