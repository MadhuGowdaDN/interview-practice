import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import skillRoutes from './routes/skill.routes.js';
import examRoutes from './routes/exam.routes.js';
import reportRoutes from './routes/report.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
connectDB(env.mongoUri);

app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorMiddleware);

app.listen(env.port, () => {
  console.log(`Server listening on ${env.port}`);
});
