import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    response: { type: String, default: '' },
    markedForReview: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Answer', answerSchema);
