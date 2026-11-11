import { Router } from 'express';
import { db } from '../data/mockDatabase.js';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/bookings
router.get('/', async (req, res) => {
  if (supabase) {
    try {
      const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) return res.json(data);
    } catch {}
  }
  return res.json(db.bookings);
});

// POST /api/bookings
router.post('/', async (req, res) => {
  const { schoolName, contactPerson, email, phone, workshopTitle, date, studentsCount, specialNotes } = req.body;

  if (!schoolName || !contactPerson || !email) {
    return res.status(400).json({ error: 'School name, contact person, and email are required.' });
  }

  const newBooking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    schoolName,
    contactPerson,
    email,
    phone: phone || '',
    workshopTitle: workshopTitle || 'Introduction to 3D Printing',
    date: date || new Date().toISOString().split('T')[0],
    studentsCount: studentsCount || '30',
    status: 'Pending',
    instructor: 'Unassigned',
    vanId: 'Van-Alpha-01',
    specialNotes: specialNotes || '',
    createdAt: new Date().toISOString()
  };

  if (supabase) {
    try {
      await supabase.from('bookings').insert([
        {
          booking_code: newBooking.id,
          school_name: newBooking.schoolName,
          contact_person: newBooking.contactPerson,
          contact_email: newBooking.email,
          contact_phone: newBooking.phone,
          workshop_title: newBooking.workshopTitle,
          preferred_date: newBooking.date,
          students_count: newBooking.studentsCount,
          status: newBooking.status,
          special_notes: newBooking.specialNotes
        }
      ]);
    } catch {}
  }

  db.bookings.unshift(newBooking);
  return res.status(201).json({ success: true, booking: newBooking });
});

// PATCH /api/bookings/:id/status
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (supabase) {
    try {
      await supabase.from('bookings').update({ status }).eq('booking_code', id);
    } catch {}
  }

  const item = db.bookings.find(b => b.id === id);
  if (item) {
    item.status = status;
    return res.json({ success: true, booking: item });
  }

  return res.json({ success: true, id, status });
});

export default router;

