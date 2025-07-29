import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  companyName: { type: String, required: true },
  location: { type: String },
  salaryRange: {
    min: { type: Number },
    max: { type: Number }
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship'],
    required: true
  },
  postedDate: { type: Date, default: Date.now },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default model('Job', jobSchema);
