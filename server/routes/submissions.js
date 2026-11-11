import { Router } from 'express';
import { db } from '../data/mockDatabase.js';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET /api/submissions
router.get('/', async (req, res) => {
  if (supabase) {
    try {
      const { data } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) return res.json(data);
    } catch {}
  }
  return res.json(db.submissions);
});

// POST /api/submissions
router.post('/', async (req, res) => {
  const { title, student, fileType, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Project title is required' });
  }

  const newSub = {
    id: `sub-${Date.now()}`,
    title,
    student: student || 'Alex Rivera',
    date: new Date().toISOString().split('T')[0],
    fileType: fileType || 'STL (2.1 MB)',
    status: 'In Review',
    feedback: 'Pre-flight slice inspection queued for Mobile Van Unit.',
    score: 'Pending',
    reviewer: 'Marcus Chen'
  };

  if (supabase) {
    try {
      await supabase.from('submissions').insert([
        {
          project_title: newSub.title,
          student_name: newSub.student,
          file_type: newSub.fileType,
          status: newSub.status,
          feedback: newSub.feedback
        }
      ]);
    } catch {}
  }

  db.submissions.unshift(newSub);
  return res.status(201).json({ success: true, submission: newSub });
});

export default router;

