// routes/jobRoutes.js
import express from 'express';
import {
  createJob,
  updateJob,
  deleteJob,
  getJobs
} from '../controllers/jobController.js';

import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, isAdmin, createJob);

router.route('/:id')
  .put(protect, isAdmin, updateJob)
  .delete(protect, isAdmin, deleteJob);

export default router;
