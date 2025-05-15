import { Request, Response } from "express";

export async function analyseUrl(req: Request, res: Response) {
    const url: string = req.params.url;

    const response = {
        url: url,
    };

    res.status(200).send(response);
}
