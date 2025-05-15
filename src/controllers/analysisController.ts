import { Request, Response } from "express";

export async function analyseUrl(req: Request, res: Response) {
    const base64Url: string = req.params.encodedBase64Url;

    const decodedUrl = Buffer.from(base64Url, "base64url").toString("utf8");

    const response = {
        url: decodedUrl,
    };

    res.status(200).send(response);
}
