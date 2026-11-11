import { Router } from 'express';

const router = Router();

// GET /api/students/courses
router.get('/courses', (req, res) => {
  res.json([
    {
      id: 'course-1',
      title: 'Tinkercad Masterclass: From Shapes to Spaceships',
      category: 'CAD Essentials',
      duration: '45 mins',
      progress: 100,
      lessonsCount: 6,
      completedLessons: 6,
      status: 'Completed',
      badge: 'CAD Novice',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'course-2',
      title: '3D Printer Slicing & Filament Science',
      category: 'Hardware',
      duration: '60 mins',
      progress: 75,
      lessonsCount: 8,
      completedLessons: 6,
      status: 'In Progress',
      badge: 'Slicing Wizard',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'course-3',
      title: 'Engineering Tolerances & Snap-Fit Joints',
      category: 'Advanced Prototyping',
      duration: '90 mins',
      progress: 30,
      lessonsCount: 10,
      completedLessons: 3,
      status: 'In Progress',
      badge: 'Joint Master',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
    }
  ]);
});

export default router;

