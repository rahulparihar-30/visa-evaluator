import "dotenv/config";
import cors from "cors";
import serverless from "serverless-http";

import express from "express";
import EvaluationRouter from "./routes/evaluation.routes.js";
import connectToMongo from "./config/db.js";
import visaRouter from "./routes/visa.routes.js";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
await connectToMongo();

app.get("/", (req, res) => {
  res.json({
    message: "Sup its live.",
  });
});
app.use("/visa", visaRouter);
app.use("/visa", EvaluationRouter);


export const handler = serverless(app);