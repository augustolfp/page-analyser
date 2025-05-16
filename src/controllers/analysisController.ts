import { Request, Response } from "express";
import puppeteer from "puppeteer";

import decodeBase64Url from "../utils/decodeBase64Url.js";

export async function analyseUrl(req: Request, res: Response) {
    const base64Url: string = req.params.encodedBase64Url;

    const decodedUrl = decodeBase64Url(base64Url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(decodedUrl);
    const pageElement = await page.$("#produtos-loop");

    const produtosLoopContent = await pageElement?.evaluate((element) => {
        const products = Array.from(element.querySelectorAll(".pd-prd"));

        const productsData = products.map((product) => {
            const titleElement = product.querySelector(".pd-prd-info-title");
            const title = titleElement.innerHTML;

            const imageElement = product.querySelector("img");
            const imageSrc = imageElement.getAttribute("data-src");

            return {
                title,
                imageSrc,
            };
        });

        return productsData;
    });

    console.log("loop content: ", produtosLoopContent);

    await browser.close();

    const response = {
        url: decodedUrl,
    };

    res.status(200).send(response);
}
