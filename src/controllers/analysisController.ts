import { Request, Response } from "express";
import { scrapePageData } from "../services/scrapingService/index.js";

import decodeBase64Url from "../utils/decodeBase64Url.js";

export async function analyseUrl(req: Request, res: Response) {
    const base64Url: string = req.params.encodedBase64Url;

    const decodedUrl = decodeBase64Url(base64Url);

    const pageData = await scrapePageData(decodedUrl);

    const response = {
        url: decodedUrl,
        pageData,
    };

    res.status(200).send(response);
}
