import "express-async-errors";
import express from "express";
import { engine } from "express-handlebars";

import cors from "cors";

import router from "./routes/index.js";
import errorHandlerMW from "./middlewares/errorHandlerMW.js";

const app = express();

// Servir arquivos estáticos (para importar css no handlebars):
app.use(express.static("public"));

app.use(express.json(), cors());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const teste = {
    primeiraProp: "Olá mundo!",
};

app.get("/", (req, res) => {
    res.render("home", { teste });
});

app.use(router);
app.use(errorHandlerMW);

export default app;
