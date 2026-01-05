import "dotenv/config";
import cors from "cors";

import express from "express";
import EvaluationRouter from "./routes/evaluation.routes.js";
import connectToMongo from "./config/db.js";
import visaRouter from "./routes/visa.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      "https://visa-evaluator.pages.dev",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.json({
    message: "Sup its live.",
  });
});
app.use("/visa", visaRouter);
app.use("/visa", EvaluationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToMongo().then(() => { console.log("MongoDB connected") });

