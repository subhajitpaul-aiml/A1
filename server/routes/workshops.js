import { Router } from 'express';
import { db } from '../data/mockDatabase.js';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/workshops
router.get('/', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('workshops').select('*');
      if (data && data.length > 0) return res.json(data);
    } catch {}
  }
  return res.json(db.workshops);
});

// GET /api/workshops/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (supabase) {
    try {
      const { data } = await supabase.from('workshops').select('*').eq('id', id).single();
      if (data) return res.json(data);
    } catch {}
  }

  const match = db.workshops.find(w => w.id === id || w.slug === id);
  if (!match) return res.status(404).json({ error: 'Workshop not found' });
  return res.json(match);
});

export default router;

