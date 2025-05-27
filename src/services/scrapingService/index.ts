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
    console.log("\nSCRAPING:");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const accessPage = ora(`Acessando página ${url}`).start();
    accessPage.indent = 4;

    await page.goto(url, {
        waitUntil: "networkidle2",
    });

    accessPage.succeed();

    const closingPopUps = ora("Fechando pop-ups e modais de cookies").start();
    closingPopUps.indent = 4;
    try {
        await page
            .locator(".modal-body .informativo-confirmacao button")
            .click();

        await delay(5000);

        await page.locator(".cookie-container button").click();

        closingPopUps.succeed();
    } catch (err) {
        closingPopUps.fail(
            "Ocorreu um erro ao fechar pop-ups e modais de cookies. É possível que a página em questão não tenha modais ou pop-ups.",
        );
    }

    await delay(5000);

    const goToBottom = ora(
        "Rolar até o fim da página para carregar imagens lazy-loaded",
    ).start();
    goToBottom.indent = 4;

    await page.evaluate(scrollToBottom, { frequency: 100, timing: 100 });

    goToBottom.succeed();

    const goToTop = ora("Voltar ao topo da página").start();
    goToTop.indent = 4;

    await delay(5000);

    await page.evaluate(`
        // Código executado no ambiente do Browser:
        window.scrollTo(0, 0);
    `);

    goToTop.succeed();

    const makeScreenshot = ora(
        "Gerando screenshot da página e salvando em scrapingResults",
    ).start();
    makeScreenshot.indent = 4;

    await delay(5000);

    const resultFilePath = `scrapingResults/${shortid.generate()}.png`;
    await page.screenshot({
        path: resultFilePath,
        fullPage: true,
    });

    makeScreenshot.succeed();

    const closeBrowser = ora("Fechando conexão do Browser").start();
    closeBrowser.indent = 4;

    await browser.close();

    closeBrowser.succeed();

    return resultFilePath;
}
