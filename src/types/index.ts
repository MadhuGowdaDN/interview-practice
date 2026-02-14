export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'MCQ' | 'CODING' | 'SHORT_ANSWER' | 'SCENARIO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER';
}

export interface Skill {
  _id: string;
  name: string;
  category?: string;
}

export interface Question {
  _id: string;
  skill: string;
  type: QuestionType;
  difficulty: Difficulty;
  prompt: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

export interface Exam {
  _id: string;
  title: string;
  skills: string[];
  difficulty: Difficulty;
  questionType: QuestionType;
  questionCount: number;
  durationInMinutes: number;
  questions: Question[];
}

export interface AnswerPayload {
  questionId: string;
  answer: string;
  markedForReview: boolean;
}

export interface EvaluatedQuestion {
  questionId: string;
  prompt: string;
  userAnswer: string;
  isCorrect: boolean;
  score: number;
  explanation: string;
  improvementFeedback: string;
}

export interface ExamResult {
  _id: string;
  examId: string;
  totalScore: number;
  maxScore: number;
  submittedAt: string;
  weakAreas: string[];
  practicePlan: string[];
  personalizedFeedback: string;
  details: EvaluatedQuestion[];
}

export interface DashboardAnalytics {
  totalExams: number;
  averageScore: number;
  bestSkill: string;
  weakSkill: string;
  skillAccuracy: Array<{ skill: string; accuracy: number }>;
  difficultyPerformance: Array<{ difficulty: string; score: number }>;
  progressTimeline: Array<{ date: string; score: number }>;
}
