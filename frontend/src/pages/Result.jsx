import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const Result = () => {
  const { userId } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const res = await api.get(`/visa/evaluated-data/${userId}`);
        setEvaluation(res);
      } catch (err) {
        setError("Failed to load evaluation result");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  const score = evaluation?.score ?? 0;

  const getScoreConfig = (score) => {
    if (score >= 80) {
      return {
        ring: "text-green-500",
        badge: "bg-green-100 text-green-700",
        label: "High Approval Probability",
      };
    }

    if (score >= 50) {
      return {
        ring: "text-orange-500",
        badge: "bg-orange-100 text-orange-700",
        label: "Moderate Approval Probability",
      };
    }

    return {
      ring: "text-red-500",
      badge: "bg-red-100 text-red-700",
      label: "Low Approval Probability",
    };
  };

  const scoreConfig = getScoreConfig(score);
  const circumference = 2 * Math.PI * 80;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Visa Evaluation Result
          </h1>
          <p className="text-slate-500 mt-2">
            AI-powered assessment of your application
          </p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <svg className="w-52 h-52 -rotate-90">
              <circle
                r="80"
                cx="104"
                cy="104"
                strokeWidth="12"
                fill="transparent"
                stroke="#e5e7eb"
              />
              <circle
                r="80"
                cx="104"
                cy="104"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                stroke="currentColor"
                className={scoreConfig.ring}
                strokeDasharray={circumference}
                strokeDashoffset={
                  circumference - (score / 100) * circumference
                }
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${scoreConfig.ring}`}>
                {score}
              </span>
              <span className="text-slate-400 text-sm">/ 100</span>
            </div>
          </div>

          {/* Status */}
          <span
            className={`px-5 py-2 rounded-full text-sm font-semibold mb-4 ${scoreConfig.badge}`}
          >
            {scoreConfig.label}
          </span>

          {/* Summary */}
          <p className="text-justify text-slate-600 max-w-xl">
            {evaluation?.summary}
          </p>

          {/* Actions */}
          <div className="mt-10 flex gap-4">

            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Contact Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
