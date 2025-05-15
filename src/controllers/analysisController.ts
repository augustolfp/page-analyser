import { Request, Response } from "express";

import decodeBase64Url from "../utils/decodeBase64Url.js";

export async function analyseUrl(req: Request, res: Response) {
    const base64Url: string = req.params.encodedBase64Url;

    const decodedUrl = decodeBase64Url(base64Url);

    const response = {
        url: decodedUrl,
    };

    res.status(200).send(response);
}
