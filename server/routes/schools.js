import { Router } from 'express';
import { db } from '../data/mockDatabase.js';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/schools
router.get('/', async (req, res) => {
  if (supabase) {
    try {
      const { data } = await supabase.from('schools').select('*');
      if (data && data.length > 0) return res.json(data);
    } catch {}
  }
  return res.json(db.schools);
});

// POST /api/schools
router.post('/', async (req, res) => {
  const { name, address, district, contactPerson, email, phone, vanParkingConfirmed } = req.body;
  if (!name || !address || !contactPerson) {
    return res.status(400).json({ error: 'School name, address, and contact are required' });
  }

  const newSchool = {
    id: `sch-${Date.now()}`,
    name,
    address,
    district: district || 'Regional District',
    contactPerson,
    email,
    phone,
    vanParkingConfirmed: !!vanParkingConfirmed
  };

  if (supabase) {
    try {
      await supabase.from('schools').insert([
        {
          name: newSchool.name,
          address: newSchool.address,
          district: newSchool.district,
          contact_person: newSchool.contactPerson,
          contact_email: newSchool.email,
          contact_phone: newSchool.phone,
          van_parking_confirmed: newSchool.vanParkingConfirmed
        }
      ]);
    } catch {}
  }

  db.schools.push(newSchool);
  return res.status(201).json({ success: true, school: newSchool });
});

export default router;

