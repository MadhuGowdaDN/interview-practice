import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalScore: { type: Number, required: true },
    correctCount: { type: Number, default: 0 },
    breakdown: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        answer: String,
        isCorrect: Boolean,
        score: Number,
        explanation: String,
        improvementFeedback: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Result', resultSchema);
