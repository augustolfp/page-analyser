import { Router } from "express";
import pageReportRouter from "./pageReportRouter.js";

const router = Router();

router.use(pageReportRouter);

export default router;
