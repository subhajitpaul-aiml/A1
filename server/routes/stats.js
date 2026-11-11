import { Router } from 'express';
import { db } from '../data/mockDatabase.js';

const router = Router();

// GET /api/stats
router.get('/', (req, res) => {
  const pending = db.bookings.filter(b => b.status === 'Pending').length;
  const completed = db.bookings.filter(b => b.status === 'Completed').length + 180;

  res.json({
    totalSchools: db.schools.length + 46,
    totalStudents: 3420,
    totalInstructors: 14,
    totalWorkshops: db.workshops.length,
    pendingBookings: pending,
    completedWorkshops: completed,
    activeMobileVans: 3,
    totalPrintHours: '4,890+'
  });
});

export default router;

