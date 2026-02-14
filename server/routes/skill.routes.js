import { Router } from 'express';
import { getSkills, seedSkills } from '../controllers/skill.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', protect, getSkills);
router.post('/seed', protect, seedSkills);

export default router;
