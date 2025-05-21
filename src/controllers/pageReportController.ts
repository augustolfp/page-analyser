import { Request, Response } from "express";
import decodeBase64Url from "../utils/decodeBase64Url.js";
import { getPageReport } from "../services/pageReportService/index.js";

export async function getPageReportFromUrl(req: Request, res: Response) {
    const base64Url: string = req.params.encodedBase64Url;

    const decodedUrl = decodeBase64Url(base64Url);

    const pageReport = await getPageReport(decodedUrl);

    const response = {
        url: decodedUrl,
        pageReport,
    };

    res.status(200).send(response);
}
