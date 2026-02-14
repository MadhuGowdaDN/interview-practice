import { Router } from 'express';
import { getDashboardAnalytics, getReports } from '../controllers/result.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/analytics', protect, getDashboardAnalytics);
router.get('/', protect, getReports);

export default router;
