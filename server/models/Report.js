import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    weakAreas: [{ type: String }],
    topicsToRevise: [{ type: String }],
    practicePlan: [{ type: String }],
    personalizedFeedback: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Report', reportSchema);
