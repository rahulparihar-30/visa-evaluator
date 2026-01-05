import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const STORAGE_DIR = path.resolve("DB");
const EVALUATION_FILE = path.join(STORAGE_DIR, "evaluations.json");
const USER_FILE = path.join(STORAGE_DIR, "users.json");

/* ================= INIT ================= */

if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

if (!fs.existsSync(EVALUATION_FILE)) {
  fs.writeFileSync(EVALUATION_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(USER_FILE)) {
  fs.writeFileSync(USER_FILE, JSON.stringify([], null, 2));
}

/* ================= HELPERS ================= */

const readJSON = (filePath) =>
  JSON.parse(fs.readFileSync(filePath, "utf-8"));

const writeJSON = (filePath, data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

/* ================= USERS ================= */

export const saveUserLocally = (user) => {
  const users = readJSON(USER_FILE);

  const newUser = {
    _id: uuidv4(), // Mongo-like _id
    fullName: user.fullName,
    email: user.email.toLowerCase(),
    country: user.country,
    visaType: user.visaType,
    documents: user.documents || [],
    evaluationScore: user.evaluationScore || null,
    evaluationSummary: user.evaluationSummary || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  writeJSON(USER_FILE, users);

  return newUser;
};

/* ================= EVALUATIONS ================= */

export const saveEvaluationLocally = (evaluation) => {
  const evaluations = readJSON(EVALUATION_FILE);

  const newEvaluation = {
    _id: uuidv4(),
    userId: evaluation.userId, // string reference to user._id
    country: evaluation.country,
    visaType: evaluation.visaType,
    score: evaluation.score,
    rawScore: evaluation.rawScore,
    summary: evaluation.summary,
    missingDocuments: evaluation.missingDocuments || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  evaluations.push(newEvaluation);
  writeJSON(EVALUATION_FILE, evaluations);

  return newEvaluation;
};
