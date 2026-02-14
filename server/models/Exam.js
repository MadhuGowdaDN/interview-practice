import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [{ type: String, required: true }],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    questionTypes: [{ type: String, required: true }],
    questionCount: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    status: { type: String, enum: ['generated', 'in_progress', 'submitted'], default: 'generated' },
    startedAt: Date,
    submittedAt: Date,
    durationInMinutes: { type: Number, default: 30 }
  },
  { timestamps: true }
);

export default mongoose.model('Exam', examSchema);
