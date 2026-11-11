-- MakerSpace on Wheels: Production PostgreSQL / Supabase Database Schema
-- Run this in your Supabase SQL Editor or standard PostgreSQL instance

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & USERS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'school', 'instructor', 'admin')),
    school_name TEXT,
    avatar_url TEXT,
    badge_title TEXT DEFAULT 'Active Maker',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SCHOOLS
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    district TEXT,
    contact_person TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    van_parking_confirmed BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. WORKSHOPS
CREATE TABLE IF NOT EXISTS public.workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    category TEXT NOT NULL,
    duration TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    grades TEXT NOT NULL,
    max_students INTEGER DEFAULT 30,
    description TEXT NOT NULL,
    image_url TEXT,
    learning_outcomes JSONB DEFAULT '[]'::jsonb,
    software_used JSONB DEFAULT '[]'::jsonb,
    hardware_included JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT UNIQUE NOT NULL,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    school_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    workshop_title TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    students_count TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    assigned_instructor TEXT DEFAULT 'Pending Assignment',
    assigned_van TEXT DEFAULT 'Van-Alpha-01',
    special_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. STUDENT SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    project_title TEXT NOT NULL,
    software_used TEXT,
    file_type TEXT,
    file_url TEXT,
    status TEXT NOT NULL DEFAULT 'In Review' CHECK (status IN ('In Review', 'Approved', 'Printed', 'Revision Needed')),
    feedback TEXT,
    score TEXT DEFAULT 'Pending',
    reviewer_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ATTENDANCE & LAB SESSIONS
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    grade_level TEXT,
    is_present BOOLEAN DEFAULT true,
    stl_model_uploaded BOOLEAN DEFAULT false,
    print_completed BOOLEAN DEFAULT false,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);

-- Row Level Security (RLS) setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow public read of active workshops
CREATE POLICY "Public workshops are viewable by everyone" 
ON public.workshops FOR SELECT USING (is_active = true);

-- Sample Seed Data
INSERT INTO public.workshops (slug, title, tagline, category, duration, difficulty, grades, description, image_url, learning_outcomes, software_used, hardware_included)
VALUES 
(
    'intro-to-3d-printing', 
    'Introduction to 3D Printing', 
    'From Digital Ideas to Tangible Plastic Reality', 
    'Foundations', 
    '2.5 Hours', 
    'Beginner', 
    'Grades 6 - 8', 
    'Students discover the wonders of additive manufacturing inside our mobile lab.',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    '["Understand FDM mechanics", "Learn filament types", "Prepare slicer settings", "Safe machine operation"]',
    '["PrusaSlicer", "Tinkercad Basics"]',
    '["Prusa MK4 Fleet", "Eco PLA Spools", "Calipers"]'
)
ON CONFLICT (slug) DO NOTHING;

