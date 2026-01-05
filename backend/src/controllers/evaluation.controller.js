import User from "../models/User.js";
import Evaluation from "../models/Evaluation.js";
import evaluateApplication from "../services/ai.service.js";
import notifyUser from "../services/email.service.js";
import visaConfig from "../utils/json.provider.js"

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

  const user = await User.create({
    fullName,
    email,
    country,
    visaType,
    documents,
  });

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

  const evaluation = await Evaluation.create({
    userId: user._id,
    country,
    visaType,
    rawScore,
    score: Math.min(aiAnalysis.score, 85),
    missingDocuments,
    summary: aiAnalysis.summary,
  });

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
    id:user._id,
    score: Math.min(evaluation.score),
    summary: evaluation.summary,
  });
};


export const getEvaluation = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Evaluation.findOne({userId})

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
