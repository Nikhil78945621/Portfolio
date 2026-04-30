import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String }
  },
  resumeUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
