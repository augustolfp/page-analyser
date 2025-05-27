import puppeteer from "puppeteer";

import scrollToBottom from "scroll-to-bottomjs";
import shortid from "shortid";

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

export async function scrapePageData(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, {
        waitUntil: "networkidle2",
    });

    await page.locator(".modal-body .informativo-confirmacao button").click();

    await delay(5000);

    await page.locator(".cookie-container button").click();

    await delay(5000);

    await page.evaluate(scrollToBottom, { frequency: 100, timing: 100 });

    await delay(5000);

    await page.evaluate(`
        // Código executado no ambiente do Browser:
        window.scrollTo(0, 0);
    `);

    await delay(5000);

    const resultFilePath = `scrapingResults/${shortid.generate()}.png`;
    await page.screenshot({
        path: resultFilePath,
        fullPage: true,
    });

    await browser.close();

    return resultFilePath;
}
