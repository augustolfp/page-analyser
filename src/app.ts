import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import { getPageReport } from "./services/pageReportService/index.js";
import fs from "fs/promises";
import decodeBase64Url from "./utils/decodeBase64Url.js";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/analysis/:base64Url", async (req: Request, res: Response) => {
    const base64Url: string = req.params.base64Url;
    const fullUrl = decodeBase64Url(base64Url);

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
