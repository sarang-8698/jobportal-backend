import { Router } from 'express';
import { applyJob,createApplication } from '../controllers/applicationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', protect, applyJob);
router.post('/', protect, createApplication);

export default router;
