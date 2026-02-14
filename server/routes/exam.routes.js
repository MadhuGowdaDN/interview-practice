import { Router } from 'express';
import { generateExam, getExamById, saveAnswer } from '../controllers/exam.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { submitExam } from '../controllers/result.controller.js';

const router = Router();

router.post('/generate', protect, generateExam);
router.get('/:id', protect, getExamById);
router.patch('/:id/answer', protect, saveAnswer);
router.post('/:id/submit', protect, submitExam);

export default router;
