// import "express-async-errors";
import express from "express";
import { engine } from "express-handlebars";
import { Request, Response } from "express";
import { getPageReport } from "./services/pageReportService/index.js";
// import cors from "cors";

// import router from "./routes/index.js";
// import errorHandlerMW from "./middlewares/errorHandlerMW.js";

const app = express();

// Servir arquivos estáticos (para importar css no handlebars):
app.use(express.static("public"));

// app.use(express.json(), cors());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const teste = {
    primeiraProp: "Olá mundo!",
};

app.get("/analysis/:restaurant", async (req: Request, res: Response) => {
    const restaurant: string = req.params.restaurant;
    const fullUrl = `https://prefirodelivery.com/${restaurant}`;

    const pageReport = await getPageReport(fullUrl);

    res.render("home", { report: JSON.stringify(pageReport) });
});

// app.use(router);
// app.use(errorHandlerMW);

export default app;
