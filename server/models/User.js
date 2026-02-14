import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER'], default: 'USER' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
