import express, { Request, Response } from "express";
import { getPageReport } from "./services/pageReportService/index.js";
import cors from "cors";

const app = express();
app.use(express.json(), cors());

app.post("/analysis", async (req: Request, res: Response) => {
    const url = req.body.url;

    const { pageAnalysis, imageFilePath } = await getPageReport(url);

    if (!pageAnalysis || !imageFilePath) {
        throw "Report não recebido";
    }

    res.status(201).send(pageAnalysis);
});

export default app;
