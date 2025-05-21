import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import { getPageReport } from "./services/pageReportService/index.js";

const app = express();

// Servir arquivos estáticos (para importar css no handlebars):
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/analysis/:restaurant", async (req: Request, res: Response) => {
    const restaurant: string = req.params.restaurant;
    const fullUrl = `https://prefirodelivery.com/${restaurant}`;

    const pageReport = await getPageReport(fullUrl);

    res.render("home", { report: JSON.stringify(pageReport) });
});

export default app;
