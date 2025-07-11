import express from 'express';
import authRoutes from './auth.routes.js';
import imageRoutes from './image.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/', imageRoutes);
router.use('/', userRoutes);

export default router;
