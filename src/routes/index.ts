import { Router } from "express";
import analysisRouter from "./analysisRouter.js";

const router = Router();

router.use(analysisRouter);

export default router;
