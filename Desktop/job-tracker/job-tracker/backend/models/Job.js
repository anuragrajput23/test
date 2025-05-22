import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: 'Applied' },
  applicationDate: { type: Date, required: true }
});

export default mongoose.model('Job', jobSchema);
