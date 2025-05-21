import { Router } from "express";
import { getPageReportFromUrl } from "../controllers/pageReportController.js";

const pageReportRouter = Router();

pageReportRouter.get("/analysis/:encodedBase64Url", getPageReportFromUrl);

export default pageReportRouter;
