import mongoose from 'mongoose';

const customRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    budget: {
      type: String, // e.g., "$100 - $300" or numeric
    },
    description: {
      type: String,
      required: true,
    },
    referenceImages: {
      type: [String], // URLs to Cloudinary uploads
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Accepted', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const CustomRequest = mongoose.model('CustomRequest', customRequestSchema);

export default CustomRequest;
