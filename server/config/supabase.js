import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project-ref.supabase.co') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✓ Supabase Client initialized with live database credentials.');
  } catch (err) {
    console.warn('! Supabase initialization failed, falling back to mock DB:', err.message);
  }
} else {
  console.log('ℹ Supabase credentials not set in server/.env — Using in-memory mock database mode.');
}

export { supabase };

