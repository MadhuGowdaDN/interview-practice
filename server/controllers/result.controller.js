import Exam from '../models/Exam.js';
import Answer from '../models/Answer.js';
import Result from '../models/Result.js';
import Report from '../models/Report.js';
import { evaluateAnswerWithAI, generateInsightsWithAI } from '../services/ai.service.js';
import { evaluationPrompt, insightsPrompt } from '../utils/prompts.js';

export const submitExam = async (req, res) => {
  const exam = await Exam.findOne({ _id: req.params.id, user: req.user._id }).populate('questions');
  if (!exam) return res.status(404).json({ message: 'Exam not found' });

  const answers = await Answer.find({ exam: exam._id, user: req.user._id });
  const answerMap = new Map(answers.map((a) => [a.question.toString(), a]));

  const breakdown = [];
  for (const question of exam.questions) {
    const answer = answerMap.get(question._id.toString());
    const fallback = {
      isCorrect: answer?.response?.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase(),
      score: answer?.response ? 50 : 0,
      explanation: question.explanation,
      improvementFeedback: 'Practice this topic using targeted mock interviews.'
    };

    const evaluation = await evaluateAnswerWithAI(
      evaluationPrompt({
        question: question.questionText,
        answer: answer?.response || '',
        questionType: question.questionType,
        correctAnswer: question.correctAnswer
      }),
      fallback
    );

    breakdown.push({
      question: question._id,
      answer: answer?.response || '',
      ...evaluation
    });
  }

  const totalScore = Math.round(breakdown.reduce((sum, item) => sum + (item.score || 0), 0) / breakdown.length);
  const correctCount = breakdown.filter((item) => item.isCorrect).length;

  const result = await Result.create({
    exam: exam._id,
    user: req.user._id,
    totalScore,
    correctCount,
    breakdown
  });

  const fallbackInsights = {
    weakAreas: exam.skills,
    topicsToRevise: exam.skills.map((s) => `${s} fundamentals`),
    practicePlan: ['Daily 30-min question drills', 'Weekly timed mock exam', 'Review AI explanations after each exam'],
    personalizedFeedback: 'You are progressing well. Focus on consistency and high-frequency weak patterns.'
  };

  const insights = await generateInsightsWithAI(
    insightsPrompt({ reportData: { totalScore, correctCount, skills: exam.skills } }),
    fallbackInsights
  );

  const report = await Report.create({ user: req.user._id, exam: exam._id, ...insights });

  exam.status = 'submitted';
  exam.submittedAt = new Date();
  await exam.save();

  res.status(201).json({ result, report });
};

export const getDashboardAnalytics = async (req, res) => {
  const results = await Result.find({ user: req.user._id }).populate({ path: 'exam', select: 'skills difficulty createdAt' });

  const totalExams = results.length;
  const averageScore = totalExams ? Math.round(results.reduce((sum, item) => sum + item.totalScore, 0) / totalExams) : 0;

  const skillStats = {};
  results.forEach((result) => {
    result.exam?.skills?.forEach((skill) => {
      if (!skillStats[skill]) skillStats[skill] = { attempts: 0, score: 0 };
      skillStats[skill].attempts += 1;
      skillStats[skill].score += result.totalScore;
    });
  });

  const skillPerformance = Object.entries(skillStats).map(([skill, stat]) => ({
    skill,
    accuracy: Math.round(stat.score / stat.attempts)
  }));

  const sorted = [...skillPerformance].sort((a, b) => b.accuracy - a.accuracy);
  res.json({
    totalExams,
    averageScore,
    bestSkill: sorted[0]?.skill || 'N/A',
    weakSkill: sorted.at(-1)?.skill || 'N/A',
    skillPerformance,
    progress: results
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((r) => ({ date: new Date(r.createdAt).toISOString().slice(0, 10), score: r.totalScore }))
  });
};

export const getReports = async (req, res) => {
  const reports = await Report.find({ user: req.user._id }).populate('exam').sort({ createdAt: -1 });
  res.json(reports);
};
