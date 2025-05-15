import { Router } from "express";
import * as analysisController from "../controllers/analysisController.js";

const analysisRouter = Router();

analysisRouter.get(
    "/analysis/:encodedBase64Url",
    analysisController.analyseUrl,
);

export default analysisRouter;
