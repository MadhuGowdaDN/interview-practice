import axios from 'axios';
import { env } from '../config/env.js';

const safeJsonParse = (raw, fallback) => {
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return fallback;
  }
};

export const askOllama = async (prompt) => {
  const response = await axios.post(`${env.ollamaUrl}/api/generate`, {
    model: env.ollamaModel,
    prompt,
    stream: false
  });

  return response.data.response;
};

export const generateQuestionsFromAI = async (prompt) => {
  try {
    const text = await askOllama(prompt);
    return safeJsonParse(text, []);
  } catch {
    return [];
  }
};

export const evaluateAnswerWithAI = async (prompt, fallback) => {
  try {
    const text = await askOllama(prompt);
    return safeJsonParse(text, fallback);
  } catch {
    return fallback;
  }
};

export const generateInsightsWithAI = async (prompt, fallback) => {
  try {
    const text = await askOllama(prompt);
    return safeJsonParse(text, fallback);
  } catch {
    return fallback;
  }
};
