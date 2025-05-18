import puppeteer from "puppeteer";

export async function scrapePageData(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const categoryHandles = await page.$$(".pd-prd-group, pd-prd-group-loop");

    const categoryTitles = await Promise.all(
        categoryHandles.map((categoryHandle) => {
            const categoryTitle: Promise<string> = categoryHandle.$eval(
                ".pd-prd-group-title span",
                (node) => node.innerText,
            );
            return categoryTitle;
        }),
    );

    console.log("Category titles: ", categoryTitles);

    await browser.close();
}
