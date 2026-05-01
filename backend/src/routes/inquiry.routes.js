import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Create a new inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, type, budget, message, attachments } = req.body;
    const newInquiry = new Inquiry({ name, email, type, budget, message, attachments });
    await newInquiry.save();
    res.status(201).json(newInquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PATCH /api/inquiries/:id
// @desc    Update inquiry status
// @access  Private (Admin)
router.patch('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    
    inquiry.status = req.body.status || inquiry.status;
    await inquiry.save();
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
