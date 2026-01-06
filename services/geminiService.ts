
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `You are CVInsight AI, an advanced resume analyzer. Your role is to evaluate resumes for professional clarity and ATS compliance.

RULES:
1. Base feedback strictly on the resume content provided.
2. If the provided resume text is NOT primarily in English, set the "isEnglish" property to false and return minimal scores.
3. If primarily in English, set "isEnglish" to true and perform a deep analysis.
4. Identify sections: Summary, Experience, Education, Skills, Projects, Certifications.
5. Provide actionable feedback and suggest better phrasing.
6. Return a valid JSON object matching the provided schema.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    isEnglish: { type: Type.BOOLEAN, description: "True if the resume is primarily in English, false otherwise." },
    overallScore: { type: Type.NUMBER },
    atsScore: { type: Type.NUMBER },
    sections: {
      type: Type.OBJECT,
      properties: {
        summary: {
          type: Type.OBJECT,
          properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } },
          required: ["score", "feedback"]
        },
        experience: {
          type: Type.OBJECT,
          properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } },
          required: ["score", "feedback"]
        },
        education: {
          type: Type.OBJECT,
          properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } },
          required: ["score", "feedback"]
        },
        skills: {
          type: Type.OBJECT,
          properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } },
          required: ["score", "feedback"]
        },
        projects: {
          type: Type.OBJECT,
          properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } },
          required: ["score", "feedback"]
        },
        certifications: {
          type: Type.OBJECT,
          properties: { score: { type: Type.NUMBER }, feedback: { type: Type.STRING } },
          required: ["score", "feedback"]
        },
      },
      required: ["summary", "experience", "education", "skills", "projects", "certifications"]
    },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
    jobMatch: {
      type: Type.OBJECT,
      properties: {
        provided: { type: Type.BOOLEAN },
        matchingScore: { type: Type.NUMBER },
        missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        matchingSections: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["provided", "matchingScore", "missingKeywords", "matchingSections"]
    }
  },
  required: ["isEnglish", "overallScore", "atsScore", "sections", "strengths", "weaknesses", "recommendations", "jobMatch"]
};

export async function analyzeResume(resumeText: string, jobDescription?: string): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following resume content. Check for language first.
    ${jobDescription ? `Compare against this JD: ${jobDescription}` : 'Analyze for general professional strength.'}
    
    Resume Content:
    ${resumeText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as AnalysisResult;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Failed to process resume. Please try again.");
  }
}
