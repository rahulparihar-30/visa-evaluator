import mongoose from "mongoose"
const EvaluationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    visaType: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      min: 0,
      max: 85,
      required: true,
    },

    rawScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    summary: {
      type: String,
    },

    missingDocuments: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Evaluation = mongoose.model("Evaluation", EvaluationSchema);
export default Evaluation;
