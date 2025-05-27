import puppeteer from "puppeteer";

import scrollToBottom from "scroll-to-bottomjs";
import shortid from "shortid";

import ora from "ora";

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

export async function scrapePageData(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const accessPage = ora(`Acessando página ${url}`).start();

    await page.goto(url, {
        waitUntil: "networkidle2",
    });

    accessPage.succeed();

    const closingPopUps = ora("Fechando pop-ups e modais de cookies").start();

    await page.locator(".modal-body .informativo-confirmacao button").click();

    await delay(5000);

    await page.locator(".cookie-container button").click();

    await delay(5000);

    closingPopUps.succeed();

    const goToBottom = ora(
        "Rolar até o fim da página para carregar imagens lazy-loaded",
    ).start();

    await page.evaluate(scrollToBottom, { frequency: 100, timing: 100 });

    goToBottom.succeed();

    const goToTop = ora("Voltar ao topo da página").start();

    await delay(5000);

    await page.evaluate(`
        // Código executado no ambiente do Browser:
        window.scrollTo(0, 0);
    `);

    goToTop.succeed();

    const makeScreenshot = ora(
        "Gerando screenshot da página e salvando em scrapingResults",
    ).start();

    await delay(5000);

    const resultFilePath = `scrapingResults/${shortid.generate()}.png`;
    await page.screenshot({
        path: resultFilePath,
        fullPage: true,
    });

    makeScreenshot.succeed();

    const closeBrowser = ora("Fechando conexão do Browser").start();

    await browser.close();

    closeBrowser.succeed();

    return resultFilePath;
}
