import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY } from '@constants/config';
import type { AnswerPayload, DashboardAnalytics, Exam, ExamResult, Skill, User } from '@types/index';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  register: async (payload: { name: string; email: string; password: string }) => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/register', payload);
    return data;
  },
  login: async (payload: { email: string; password: string }) => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/login', payload);
    return data;
  }
};

export const skillApi = {
  getSkills: async () => {
    const { data } = await api.get<Skill[]>('/skills');
    return data;
  }
};

export const examApi = {
  generateExam: async (payload: {
    skills: string[];
    difficulty: string;
    questionType: string;
    questionCount: number;
  }) => {
    const { data } = await api.post<Exam>('/exams/generate', payload);
    return data;
  },
  getExam: async (id: string) => {
    const { data } = await api.get<Exam>(`/exams/${id}`);
    return data;
  },
  saveAnswer: async (id: string, payload: AnswerPayload) => {
    const { data } = await api.patch(`/exams/${id}/answer`, payload);
    return data;
  },
  submitExam: async (id: string) => {
    const { data } = await api.post<ExamResult>(`/exams/${id}/submit`);
    return data;
  }
};

export const reportApi = {
  getAnalytics: async () => {
    const { data } = await api.get<DashboardAnalytics>('/reports/analytics');
    return data;
  },
  getReports: async () => {
    const { data } = await api.get<ExamResult[]>('/reports');
    return data;
  }
};

export default api;
