export const questionPrompt = ({ skills, difficulty, types, count }) => `
You are an interview assessment generator. Return STRICT JSON array.
Generate ${count} unique interview questions.
Skills: ${skills.join(', ')}
Difficulty: ${difficulty}
Question types: ${types.join(', ')}
Each item schema:
{
  "skill": "string",
  "difficulty": "Easy|Medium|Hard",
  "questionType": "MCQ|Coding|Short Answer|Scenario Based",
  "questionText": "string",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "string",
  "explanation": "string",
  "tags": ["string"]
}
Rules:
- options required only for MCQ
- coding problems include starter guidance in questionText
- ensure no duplicates
`;

export const evaluationPrompt = ({ question, answer, questionType, correctAnswer }) => `
You are a strict evaluator. Return JSON object:
{
 "isCorrect": boolean,
 "score": number,
 "explanation": "string",
 "improvementFeedback": "string"
}
Question Type: ${questionType}
Question: ${question}
Expected Answer: ${correctAnswer}
User Answer: ${answer}
Scoring rubric:
- MCQ exact match
- Coding evaluate logic and output correctness
- Descriptive/scenario evaluate semantic accuracy and completeness
Score is 0-100.
`;

export const insightsPrompt = ({ reportData }) => `
Generate interview improvement insights in JSON:
{
  "weakAreas": ["string"],
  "topicsToRevise": ["string"],
  "practicePlan": ["string"],
  "personalizedFeedback": "string"
}
Use this report summary: ${JSON.stringify(reportData)}
`;
