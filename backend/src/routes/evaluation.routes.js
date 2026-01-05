import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  getEvaluation,
  submitForEvaluation,
} from "../controllers/evaluation.controller.js";

const EvaluationRouter = Router();

EvaluationRouter.post("/evaluate", upload.any(), submitForEvaluation);
EvaluationRouter.get("/evaluated-data/:userId", getEvaluation);

export default EvaluationRouter;
