import express, { Request, Response } from "express";
import { getPageReport } from "./services/pageReportService/index.js";
import cors from "cors";
import sendEmail from "./services/emailService/index.js";
import ora from "ora";

const app = express();
app.use(express.json(), cors());

app.post("/analysis", async (req: Request, res: Response) => {
    const { urlRestaurante, nomeRestaurante, emailCliente, nomeCliente } =
        req.body;

    res.status(201).send(
        "Geração de relatório iniciada com sucesso. O resultado será recebido via e-mail.",
    );

    const gerandoReport = ora("Gerando report em PDF").start();
    await getPageReport(urlRestaurante);
    gerandoReport.succeed();

    // const enviandoEmail = ora("Enviado report via email").start();
    // await sendEmail(
    //     nomeCliente,
    //     emailCliente,
    //     "Avaliação do Cardápio por IA",
    //     `
    //     Olá ${nomeCliente}!
    //     \n
    //     Segue em anexo o relatório do cardápio de ${nomeRestaurante}, gerado por Inteligência Artificial.
    //     Esperamos que este traga insights valiosos.
    //     \n
    //     Atenciosamente,
    //     Equipe Prefiro Delivery
    //     `,
    //     [
    //         {
    //             path: reportFilePath,
    //         },
    //         {
    //             path: imageFilePath,
    //         },
    //     ],
    // );
    // enviandoEmail.succeed();
});

export default app;
