// models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'candidate'], default: 'candidate' }
}, { timestamps: true });

export default model('User', userSchema);
