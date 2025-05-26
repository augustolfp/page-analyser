import puppeteer from "puppeteer";
import type { PageData } from "../../types/index.js";
import { getAllProducts } from "./productService.js";

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

export async function scrapePageData(url: string): Promise<PageData> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, {
        waitUntil: "networkidle2",
    });

    await page.locator(".modal-body .informativo-confirmacao button").click();

    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });

    await delay(5000);

    await page.screenshot({
        path: "hn.png",
        fullPage: true,
    });

    const productsByCategory = await getAllProducts(page);

    await browser.close();

    return {
        productsByCategory,
    };
}
