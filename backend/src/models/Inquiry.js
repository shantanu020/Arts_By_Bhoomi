import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['general', 'custom'], default: 'custom' },
  budget: { type: String },
  message: { type: String, required: true },
  attachments: [{ type: String }],
  status: { type: String, enum: ['new', 'responded', 'archived'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
