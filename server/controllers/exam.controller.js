import Exam from '../models/Exam.js';
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';
import { generateQuestionsFromAI } from '../services/ai.service.js';
import { questionPrompt } from '../utils/prompts.js';

export const generateExam = async (req, res) => {
  const { skills, difficulty, questionTypes, questionCount, durationInMinutes = 30 } = req.body;
  const prompt = questionPrompt({ skills, difficulty, types: questionTypes, count: questionCount });

  const generated = await generateQuestionsFromAI(prompt);

  const normalized = generated.slice(0, questionCount).map((q) => ({
    skill: q.skill || skills[0],
    difficulty,
    questionType: q.questionType,
    questionText: q.questionText,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    tags: q.tags || []
  }));

  const questionDocs = [];
  for (const payload of normalized) {
    const existing = await Question.findOne({ questionText: payload.questionText });
    if (existing) {
      questionDocs.push(existing);
      continue;
    }
    const created = await Question.create(payload);
    questionDocs.push(created);
  }

  const exam = await Exam.create({
    user: req.user._id,
    skills,
    difficulty,
    questionTypes,
    questionCount,
    questions: questionDocs.map((q) => q._id),
    durationInMinutes
  });

  await Promise.all(
    questionDocs.map((question) =>
      Answer.create({ exam: exam._id, user: req.user._id, question: question._id })
    )
  );

  const detailedExam = await Exam.findById(exam._id).populate('questions');
  res.status(201).json(detailedExam);
};

export const getExamById = async (req, res) => {
  const exam = await Exam.findOne({ _id: req.params.id, user: req.user._id }).populate('questions');
  if (!exam) return res.status(404).json({ message: 'Exam not found' });
  res.json(exam);
};

export const saveAnswer = async (req, res) => {
  const { questionId, response, markedForReview } = req.body;
  const answer = await Answer.findOneAndUpdate(
    { exam: req.params.id, user: req.user._id, question: questionId },
    { response, markedForReview },
    { new: true }
  );

  res.json(answer);
};
