import "dotenv/config";
import cors from "cors";

import express from "express";
import EvaluationRouter from "./routes/evaluation.routes.js";
import connectToMongo from "./config/db.js";
import visaRouter from "./routes/visa.routes.js";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
connectToMongo();

app.get("/", (req, res) => {
  res.json({
    message: "Sup its live.",
  });
});
app.use("/visa", visaRouter);
app.use("/visa", EvaluationRouter);

app.listen(PORT, () => {
  console.log("Server started and listening to PORT", PORT);
});
