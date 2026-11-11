// In-memory mock database store for seamless offline / zero-setup running
export const db = {
  users: [
    {
      id: 'usr-1',
      email: 'alex.rivera@student.oakridge.edu',
      name: 'Alex Rivera',
      role: 'student',
      school: 'Oakridge Middle School',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      badge: 'Level 3 Maker'
    },
    {
      id: 'usr-2',
      email: 'sjenkins@crestview.k12.us',
      name: 'Sarah Jenkins',
      role: 'teacher',
      school: 'Crestview Middle School',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      badge: 'STEM Ambassador'
    },
    {
      id: 'usr-3',
      email: 'rvance@lincolnmiddle.edu',
      name: 'Dr. Robert Vance',
      role: 'school',
      school: 'Lincoln Middle School',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badge: 'District Partner'
    },
    {
      id: 'usr-4',
      email: 'marcus.chen@makerspaceonwheels.org',
      name: 'Marcus Chen',
      role: 'instructor',
      school: 'MakerSpace Mobile Fleet 1',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      badge: 'Certified Master Maker'
    },
    {
      id: 'usr-5',
      email: 'elena@makerspaceonwheels.org',
      name: 'Elena Rostova',
      role: 'admin',
      school: 'MakerSpace Global HQ',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      badge: 'Platform Administrator'
    }
  ],

  schools: [
    {
      id: 'sch-1',
      name: 'Lincoln Middle School',
      address: '1044 Innovation Blvd, Cityville, ST 90210',
      district: 'District 3 STEM Zone',
      contactPerson: 'Dr. Robert Vance',
      email: 'rvance@lincolnmiddle.edu',
      phone: '+1 (555) 382-9102',
      vanParkingConfirmed: true
    },
    {
      id: 'sch-2',
      name: 'Oakridge Middle School',
      address: '772 Oakridge Ave, Hilltown, ST 90211',
      district: 'Charter Cluster B',
      contactPerson: 'Sarah Jenkins',
      email: 'sjenkins@crestview.k12.us',
      phone: '+1 (555) 472-8819',
      vanParkingConfirmed: true
    }
  ],

  workshops: [
    {
      id: 'ws-1',
      title: 'Introduction to 3D Printing',
      slug: 'intro-to-3d-printing',
      tagline: 'From Digital Ideas to Tangible Plastic Reality',
      category: 'Foundations',
      duration: '2.5 Hours',
      difficulty: 'Beginner',
      grades: 'Grades 6 - 8',
      maxStudents: 30,
      description: 'Students discover the wonders of additive manufacturing inside our mobile lab.',
      learningOutcomes: [
        'Understand FDM mechanics',
        'Learn filament types (PLA, PETG)',
        'Prepare slicer settings',
        'Safe machine operation'
      ]
    },
    {
      id: 'ws-2',
      title: 'Beginner CAD Modelling',
      slug: 'beginner-cad-modelling',
      tagline: 'Designing in 3 Dimensions with Tinkercad',
      category: 'Design & Software',
      duration: '3.0 Hours',
      difficulty: 'Beginner',
      grades: 'Grades 6 - 8',
      maxStudents: 28,
      description: 'Transform mental concepts into precise digital geometry with Tinkercad.',
      learningOutcomes: [
        'Master the workplane and alignment',
        'Apply boolean cutouts',
        'Calculate metric tolerances',
        'Export STL files'
      ]
    },
    {
      id: 'ws-3',
      title: 'Digital Fabrication',
      slug: 'digital-fabrication',
      tagline: 'Multi-Tool Creation: Laser, Vinyl & 3D Extrusion',
      category: 'Makerspace Core',
      duration: '4.0 Hours',
      difficulty: 'Intermediate',
      grades: 'Grades 7 - 9',
      maxStudents: 25,
      description: 'A deep-dive maker journey exploring modern factory prototyping.',
      learningOutcomes: [
        'Compare subtractive vs additive',
        'Design 2D interlocking parts',
        'Inspect material strength',
        'Physical test fitting'
      ]
    },
    {
      id: 'ws-4',
      title: 'Rapid Prototyping',
      slug: 'rapid-prototyping',
      tagline: 'The Design-Build-Test Engineering Loop',
      category: 'Engineering & Innovation',
      duration: '3.5 Hours',
      difficulty: 'Intermediate',
      grades: 'Grades 7 - 9',
      maxStudents: 26,
      description: 'Brainstorm, CAD model, and 3D print functional gadgets within a single session.',
      learningOutcomes: [
        'Implement Design Thinking',
        'Rapid cardboard-to-CAD translation',
        'Optimize print speeds',
        'Team pitch presentation'
      ]
    },
    {
      id: 'ws-5',
      title: 'Creative STEM Projects',
      slug: 'creative-stem-projects',
      tagline: 'Robotics Shells & Kinetic Mechanisms',
      category: 'Applied STEM',
      duration: '4.0 Hours',
      difficulty: 'All Levels',
      grades: 'Grades 6 - 9',
      maxStudents: 32,
      description: 'Fuse electronics, code, and 3D printed enclosures.',
      learningOutcomes: [
        'Snap-fit sensor enclosures',
        'Assembly tolerances',
        'Bio-inspired kinetic gears',
        'Take-home engineering artifact'
      ]
    }
  ],

  bookings: [
    {
      id: 'BK-1082',
      schoolName: 'Lincoln Middle School',
      contactPerson: 'Dr. Robert Vance',
      email: 'rvance@lincolnmiddle.edu',
      phone: '+1 (555) 382-9102',
      workshopTitle: 'Introduction to 3D Printing',
      date: '2026-11-20',
      studentsCount: '35',
      status: 'Confirmed',
      instructor: 'Marcus Chen',
      vanId: 'Van-Alpha-01'
    },
    {
      id: 'BK-1083',
      schoolName: 'Oakridge Middle School',
      contactPerson: 'Sarah Jenkins',
      email: 'sjenkins@crestview.k12.us',
      phone: '+1 (555) 472-8819',
      workshopTitle: 'Beginner CAD Modelling',
      date: '2026-11-24',
      studentsCount: '28',
      status: 'Pending',
      instructor: 'Unassigned',
      vanId: 'Van-Beta-02'
    }
  ],

  submissions: [
    {
      id: 'sub-1',
      title: 'Planetary Gear Reducer',
      student: 'Alex Rivera',
      date: '2026-11-08',
      fileType: 'STL (3.4 MB)',
      status: 'Approved',
      feedback: 'Outstanding dimensional accuracy! The 0.3mm tolerance printed smoothly.',
      score: '98 / 100',
      reviewer: 'Marcus Chen'
    }
  ],

  attendance: [
    { id: 'att-1', bookingId: 'BK-1082', studentName: 'Alex Rivera', isPresent: true },
    { id: 'att-2', bookingId: 'BK-1082', studentName: 'Jordan Lee', isPresent: true },
    { id: 'att-3', bookingId: 'BK-1082', studentName: 'Maya Patel', isPresent: true }
  ]
};

