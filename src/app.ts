import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import { getPageReport } from "./services/pageReportService/index.js";
import fs from "fs/promises";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/analysis/:restaurant", async (req: Request, res: Response) => {
    const restaurant: string = req.params.restaurant;
    const fullUrl = `https://prefirodelivery.com/${restaurant}`;

    const { pageAnalysis, imageFilePath } = await getPageReport(fullUrl);

    if (!pageAnalysis || !imageFilePath) {
        throw "Report não recebido";
    }

    const base64Screenshot = await fs.readFile(imageFilePath, "base64");

    res.render("home", {
        pageAnalysis,
        screenshot: `data:image/png;base64,${base64Screenshot}`,
    });
});

export default app;
