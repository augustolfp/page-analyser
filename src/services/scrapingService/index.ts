import puppeteer from "puppeteer";

import scrollToBottom from "scroll-to-bottomjs";
import shortid from "shortid";

export async function scrapePageData(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(url, {
        waitUntil: "networkidle2",
    });

    try {
        await page
            .locator(".modal-body .informativo-confirmacao button")
            .click();
    } catch (err) {}

    try {
        await page.locator(".cookie-container button").click();
    } catch (err) {}

    await page.evaluate(scrollToBottom, { frequency: 100, timing: 100 });

    await page.evaluate(`
        // Código executado no ambiente do Browser:
        window.scrollTo(0, 0);
    `);

    const filenameWithPath = `scrapingResults/${shortid.generate()}`;

    const screenshotOptions: puppeteer.ScreenshotOptions = {
        path: `${filenameWithPath}.png`,
        fullPage: true,
    };

    await page.screenshot(screenshotOptions);

    await browser.close();

    return `${filenameWithPath}.png`;
}
