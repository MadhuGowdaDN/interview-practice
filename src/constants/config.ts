export const APP_NAME = 'Interview Practice & Assessment Platform';
export const AUTH_TOKEN_KEY = 'ipa_access_token';
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const QUESTION_TYPES = [
  { label: 'MCQ', value: 'MCQ' },
  { label: 'Coding', value: 'CODING' },
  { label: 'Short Answer', value: 'SHORT_ANSWER' },
  { label: 'Scenario Based', value: 'SCENARIO' }
] as const;

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'] as const;
