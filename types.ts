
export type View = 'analyzer' | 'ats-guide';

export interface SectionFeedback {
  score: number;
  feedback: string;
}

export interface JobMatch {
  provided: boolean;
  matchingScore: number;
  missingKeywords: string[];
  matchingSections: string[];
}

export interface AnalysisResult {
  isEnglish: boolean;
  overallScore: number;
  atsScore: number;
  sections: {
    summary: SectionFeedback;
    experience: SectionFeedback;
    education: SectionFeedback;
    skills: SectionFeedback;
    projects: SectionFeedback;
    certifications: SectionFeedback;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  jobMatch: JobMatch;
}

export interface AnalysisState {
  resumeText: string;
  jobDescription: string;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}
