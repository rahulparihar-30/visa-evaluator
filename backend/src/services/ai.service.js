import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.G_API_KEY,
});

function extractJSON(text) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export const evaluateApplication = async (applicationInfo) => {
  const prompt = `
You are an immigration visa evaluation assistant.

Country: ${applicationInfo.country}
Visa Type: ${applicationInfo.type}

Required Documents: ${applicationInfo.requiredDocs.join(", ")}
Uploaded Documents: ${applicationInfo.uploadedDocs.join(", ")}
Missing Documents: ${applicationInfo.missingDocs.join(", ")}
Raw Score: ${applicationInfo.rawScore} (based on the things uploaded.)
Context : ${applicationInfo.context} (achivements, milestones or anything)

Task:
1. Evaluate the likelihood of visa approval.
2. Return a score between 0 and 100.
3. Provide a short, actionable summary and suggestions (5-6 sentences).
4. Be conservative.
5. DO NOT wrap the response in markdown or code blocks.

Respond STRICTLY in valid JSON:
{
  "score": number,
  "summary": string
}
`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      generationConfig: {
        temperature: 0.2,
      },
    });

    const rawText = result.text;

    const parsed = extractJSON(rawText);

    return {
      score: Number.isFinite(parsed.score)
        ? Math.max(0, Math.min(100, parsed.score))
        : 50,
      summary:
        typeof parsed.summary === "string"
          ? parsed.summary
          : "Evaluation completed with conservative assumptions.",
    };
  } catch (error) {
    console.error("AI evaluation failed:", error);
    return {
      score: 50,
      summary: "AI evaluation failed. Conservative fallback applied.",
    };
  }
};

export default evaluateApplication;
