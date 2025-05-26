import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import { getPageReport } from "./services/pageReportService/index.js";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/analysis/:restaurant", async (req: Request, res: Response) => {
    const restaurant: string = req.params.restaurant;
    const fullUrl = `https://prefirodelivery.com/${restaurant}`;

    await getPageReport(fullUrl);

    // const { pageAnalysis, productsByCategory, imagesWithDescription } =
    //     await getPageReport(fullUrl);

    // res.render("home", {
    //     pageAnalysis,
    //     productsByCategory,
    //     imagesWithDescription,
    // });
    res.sendStatus(200);
});

export default app;
