import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    questionType: { type: String, enum: ['MCQ', 'Coding', 'Short Answer', 'Scenario Based'], required: true },
    questionText: { type: String, required: true, unique: true },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);
