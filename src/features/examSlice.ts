import { create } from 'zustand';
import { examApi, skillApi } from '@services/api';
import type { AnswerPayload, Exam, Skill } from '@types/index';

interface ExamState {
  skills: Skill[];
  currentExam: Exam | null;
  answers: Record<string, { answer: string; markedForReview: boolean }>;
  fetchSkills: () => Promise<void>;
  generateExam: (payload: {
    skills: string[];
    difficulty: string;
    questionType: string;
    questionCount: number;
  }) => Promise<Exam>;
  fetchExam: (id: string) => Promise<void>;
  saveAnswer: (examId: string, payload: AnswerPayload) => Promise<void>;
  resetExamState: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  skills: [],
  currentExam: null,
  answers: {},
  fetchSkills: async () => {
    const skills = await skillApi.getSkills();
    set({ skills });
  },
  generateExam: async (payload) => {
    const exam = await examApi.generateExam(payload);
    set({ currentExam: exam, answers: {} });
    return exam;
  },
  fetchExam: async (id) => {
    const exam = await examApi.getExam(id);
    set({ currentExam: exam });
  },
  saveAnswer: async (examId, payload) => {
    await examApi.saveAnswer(examId, payload);
    const existing = get().answers;
    set({
      answers: {
        ...existing,
        [payload.questionId]: { answer: payload.answer, markedForReview: payload.markedForReview }
      }
    });
  },
  resetExamState: () => set({ currentExam: null, answers: {} })
}));
