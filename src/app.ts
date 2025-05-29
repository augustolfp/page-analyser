import express, { Request, Response } from "express";
import { getPageReport } from "./services/pageReportService/index.js";
import cors from "cors";
import sendEmail from "./services/emailService/index.js";
import ora from "ora";

const app = express();
app.use(express.json(), cors());

app.post("/analysis", async (req: Request, res: Response) => {
    const url = req.body.url;

    res.status(201).send(
        "Geração de relatório iniciada com sucesso. O resultado será recebido via e-mail.",
    );

    const gerandoReport = ora("Gerando report em PDF").start();
    const { reportFilePath, imageFilePath } = await getPageReport(url);
    gerandoReport.succeed();

    const enviandoEmail = ora("Enviado report via email").start();
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
    enviandoEmail.succeed();
});

export default app;
