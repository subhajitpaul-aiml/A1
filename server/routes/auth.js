import { Router } from 'express';
import { db } from '../data/mockDatabase.js';
import { supabase } from '../config/supabase.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // If Supabase live client is enabled
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();
      if (data && !error) {
        return res.json({ user: data, token: 'live-token-supabase' });
      }
    } catch {}
  }

  // Fallback to mock user
  const found = db.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
    id: `usr-${Date.now()}`,
    email: email.toLowerCase(),
    name: email.split('@')[0],
    role: role || 'student',
    school: 'Partner School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    badge: 'Active Explorer'
  };

  return res.json({ user: found, token: 'mock-jwt-token-demo' });
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, name, role, school } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and full name are required' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.toLowerCase(),
    name,
    role: role || 'student',
    school: school || 'Middle School Partner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    badge: 'New Explorer'
  };

  if (supabase) {
    try {
      await supabase.from('profiles').insert([
        {
          email: newUser.email,
          full_name: newUser.name,
          role: newUser.role,
          school_name: newUser.school,
          avatar_url: newUser.avatar,
          badge_title: newUser.badge
        }
      ]);
    } catch {}
  }

  db.users.push(newUser);
  return res.status(201).json({ user: newUser, token: 'mock-jwt-token-new' });
});

export default router;

