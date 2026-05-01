import express from 'express';
import {
  createRequest,
  getRequests,
  updateRequestStatus,
} from '../controllers/request.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').post(createRequest).get(protect, admin, getRequests);
router.route('/:id').put(protect, admin, updateRequestStatus);

export default router;
