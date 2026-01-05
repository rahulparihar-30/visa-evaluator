import mongoose from "mongoose";
import DocumentSchema from "./Document.js";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
    },
    visaType: { type: String, required: true },
    documents: [DocumentSchema],
    evaluationScore: { type: Number, max: 85 },
    evaluationSummary: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
