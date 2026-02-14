# InterviewPro AI - Interview Practice & Assessment Platform

Production-ready full-stack interview practice platform with AI-driven exam generation, scoring, and improvement insights.

## Stack
- **Frontend:** Vite + React + TypeScript, React Router, Zustand, MUI, Formik + Yup, Axios, Recharts
- **Backend:** Node.js + Express + MongoDB (Mongoose), JWT auth
- **AI:** Open-source model via **Ollama** (Mistral/Llama/etc.)

## Project Structure
```
src/
 ├── app/
 ├── components/
 ├── pages/
 │    ├── Login
 │    ├── Register
 │    ├── Dashboard
 │    ├── CreateExam
 │    ├── TakeExam
 │    ├── Result
 │    ├── Reports
 ├── store/
 ├── services/
 ├── hooks/
 ├── utils/
 ├── styles/
 └── main.tsx

server/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── services/
 │    └── ai.service.js
 ├── middlewares/
 ├── config/
 ├── utils/
 └── index.js
```

## Features Implemented
1. JWT registration/login flow (USER role).
2. Skills + exam config (difficulty/type/count).
3. AI question generation with dedupe persistence.
4. Timer-based exam, one-question flow, mark-for-review, autosave, refresh guard.
5. AI answer evaluation with per-question explanations and feedback.
6. Dashboard cards + charts (skill accuracy + progress trend).
7. Detailed report view with PDF-export-ready section.
8. AI improvement insights (weak areas, revise topics, practice plan, personalized feedback).

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/skills`
- `POST /api/skills/seed`
- `POST /api/exams/generate`
- `GET /api/exams/:id`
- `PATCH /api/exams/:id/answer`
- `POST /api/exams/:id/submit`
- `GET /api/reports/analytics`
- `GET /api/reports`

## AI Prompt Design
Prompt templates are centralized in `server/utils/prompts.js`:
- `questionPrompt` for exam question generation
- `evaluationPrompt` for answer scoring and explanation
- `insightsPrompt` for personalized performance recommendations

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env
   ```bash
   cp .env.example .env
   ```
3. Start MongoDB locally.
4. Start Ollama and pull a model:
   ```bash
   ollama pull mistral
   ollama serve
   ```
5. Run app (frontend + backend)
   ```bash
   npm run dev
   ```

## Sample Data
- Use `POST /api/skills/seed` after login (frontend does this automatically on Create Exam screen).

## Interview Demo Talking Points
- Cleanly separated exam generation vs evaluation services.
- Configurable AI prompts for future provider abstraction.
- Dashboard-first UX with role-ready architecture for future admin expansion.
