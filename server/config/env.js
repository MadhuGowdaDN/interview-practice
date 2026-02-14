import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interview_practice',
  jwtSecret: process.env.JWT_SECRET || 'development_secret',
  ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
  ollamaModel: process.env.OLLAMA_MODEL || 'mistral',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
