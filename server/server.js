import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports
import authRoutes from './routes/auth.js';
import workshopsRoutes from './routes/workshops.js';
import bookingsRoutes from './routes/bookings.js';
import schoolsRoutes from './routes/schools.js';
import submissionsRoutes from './routes/submissions.js';
import studentsRoutes from './routes/students.js';
import attendanceRoutes from './routes/attendance.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: 'MakerSpace on Wheels API',
    tagline: 'Learn. Design. Create. Innovate.',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/workshops', workshopsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/schools', schoolsRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/stats', statsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 MakerSpace on Wheels Server is running on port ${PORT}`);
  console.log(`📍 API Base: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
});

export default app;

