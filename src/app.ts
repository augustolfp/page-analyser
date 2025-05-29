import express, { Request, Response } from "express";
import { getPageReport } from "./services/pageReportService/index.js";
import cors from "cors";
import sendEmail from "./services/emailService/index.js";

const app = express();
app.use(express.json(), cors());

app.post("/analysis", async (req: Request, res: Response) => {
    const url = req.body.url;

    const { reportFilePath, imageFilePath } = await getPageReport(url);

    await sendEmail(
        "Augusto Lopes",
        "augustolfp@gmail.com",
        "Teste de SMTP",
        "Boa tarde!",
        [
            {
                path: reportFilePath,
            },
            {
                path: imageFilePath,
            },
        ],
    );

    res.status(201).send("Geração de relatório triggada");
});

export default app;
