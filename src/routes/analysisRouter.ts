import { Router } from "express";
import * as analysisController from "../controllers/analysisController.js";

const analysisRouter = Router();

analysisRouter.get("/analysis/:url", analysisController.analyseUrl);

export default analysisRouter;
