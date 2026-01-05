import User from "../models/User.js";
import Evaluation from "../models/Evaluation.js";
import mongoose from "mongoose";
import evaluateApplication from "../services/ai.service.js";
import notifyUser from "../services/email.service.js";
import visaConfig from "../utils/json.provider.js";
import {
  saveUserLocally,
  saveEvaluationLocally,
  getEvaluationLocally,
} from "../utils/evaluation.storage.js";

export const submitForEvaluation = async (req, res) => {
  const { fullName, email, country, visaType } = req.body;

  const countryConfig = visaConfig[country];
  const visaConfigForType = countryConfig.visas[visaType];
  const requiredDocs = visaConfigForType.requiredDocuments;

  let context = req.body.context;
  if (!context) context = NaN;

  console.log(requiredDocs);

  const uploadedDocs = req.files.map((file) => file.fieldname);

  const missingDocuments = requiredDocs.filter(
    (doc) => !uploadedDocs.includes(doc)
  );

  const documents = req.files.map((file) => ({
    name: file.fieldname,
    mimeType: file.mimetype,
    size: file.size,
    data: file.buffer,
  }));

  let user;
  try {
    user = await User.create({
      fullName,
      email,
      country,
      visaType,
      documents,
    });
  } catch (err) {
    console.error("MongoDB User Create Failed ", err.message);
    user = saveUserLocally({
      fullName,
      email,
      country,
      visaType,
      documents,
    });
  }

  const rawScore = 100 - missingDocuments.length * 20;
  // with ai
  const aiAnalysis = await evaluateApplication({
    rawScore,
    country,
    visaType,
    requiredDocs,
    uploadedDocs,
    missingDocs: missingDocuments,
    context,
  });

  let evaluation;
  try {
    evaluation = await Evaluation.create({
      userId: user._id,
      country,
      visaType,
      rawScore,
      score: Math.min(aiAnalysis.score, 85),
      missingDocuments,
      summary: aiAnalysis.summary,
    });
  } catch (err) {
    console.error("MongoDB Evaluation Create Failed:", err.message);
    evaluation = saveEvaluationLocally({
      userId: user._id,
      country,
      visaType,
      rawScore,
      score: Math.min(aiAnalysis.score, 85),
      missingDocuments,
      summary: aiAnalysis.summary,
    });
  }

  const receipentDetail = {
    fullName,
    email,
    country,
    visaType,
    score: evaluation.score,
    summary: evaluation.summary,
  };

  const emailResponse = await notifyUser(receipentDetail);

  res.json({
    id: user._id,
    score: Math.min(evaluation.score),
    summary: evaluation.summary,
  });
};

export const getEvaluation = async (req, res) => {
  const { userId } = req.params;

  try {
    let result = null;

    // 1. Try MongoDB if userId looks like a MongoID
    if (mongoose.Types.ObjectId.isValid(userId)) {
      try {
        result = await Evaluation.findOne({ userId });
      } catch (dbErr) {
        console.error(
          "MongoDB fetch failed (timeout or other), checking local storage:",
          dbErr.message
        );
        // Do not throw here, just fall through to local check
      }
    }

    // 2. If no result from DB (either not found, error, or invalid ID), check local
    if (!result) {
      console.log("Checking local storage for evaluation...");
      result = getEvaluationLocally(userId);
    }

    if (!result) {
      return res.status(404).json({
        message: "Evaluation not found",
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching evaluation:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
