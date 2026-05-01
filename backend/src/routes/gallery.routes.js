import express from 'express';
import {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/gallery.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(getGalleryItems).post(protect, admin, createGalleryItem);
router.route('/:id').delete(protect, admin, deleteGalleryItem);

export default router;
