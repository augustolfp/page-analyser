import puppeteer, { ElementHandle } from "puppeteer";
import type { Category, PageData } from "../../types/index.js";
import { getChildrenProducts } from "./productService.js";

export async function scrapePageData(url: string): Promise<PageData> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const handles = await page.$$(".pd-prd-group, pd-prd-group-loop");

    const categories = await Promise.all(
        handles.map((handle) => getCategory(handle)),
    );

    await browser.close();

    return {
        categories,
    };
}

async function getCategory(
    categoryHandle: ElementHandle<any>,
): Promise<Category> {
    const title: string = await categoryHandle.$eval(
        ".pd-prd-group-title span",
        (node) => node.innerText,
    );

    const products = await getChildrenProducts(categoryHandle);

    return {
        title: title,
        products: products,
    };
}
