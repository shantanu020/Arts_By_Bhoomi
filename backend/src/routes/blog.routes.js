import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').get(getBlogs).post(protect, admin, createBlog);
router.route('/:slug').get(getBlogBySlug);
router.route('/:id').put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;
