import { Router } from 'express';
import { db } from '../data/mockDatabase.js';

const router = Router();

// GET /api/attendance
router.get('/', (req, res) => {
  res.json(db.attendance);
});

// POST /api/attendance/mark
router.post('/mark', (req, res) => {
  const { studentName, isPresent, bookingId } = req.body;
  const match = db.attendance.find(a => a.studentName === studentName && (!bookingId || a.bookingId === bookingId));
  if (match) {
    match.isPresent = isPresent;
    return res.json({ success: true, item: match });
  }

  const newRecord = {
    id: `att-${Date.now()}`,
    bookingId: bookingId || 'BK-1082',
    studentName,
    isPresent
  };
  db.attendance.push(newRecord);
  return res.status(201).json({ success: true, item: newRecord });
});

export default router;

