import "express-async-errors";
import express from "express";

import cors from "cors";

import errorHandlerMW from "./middlewares/errorHandlerMW.js";

const app = express();
app.use(express.json(), cors());

app.use(errorHandlerMW);

export default app;