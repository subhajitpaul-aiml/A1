export const WORKSHOPS = [
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
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Students discover the wonders of additive manufacturing inside our mobile lab. They learn how 3D printers work, explore molten PLA filaments, understand slicer software, and monitor real-time prints.',
    learningOutcomes: [
      'Understand Fused Deposition Modeling (FDM) mechanics and extrusion',
      'Learn filament types (PLA, PETG) and ecological considerations',
      'Prepare 3D models using Cura / PrusaSlicer settings (infill, supports)',
      'Hands-on calibration and safe machine operation'
    ],
    softwareUsed: ['PrusaSlicer', 'Tinkercad Basics'],
    hardwareIncluded: ['Prusa MK4 Fleet', 'Eco-friendly PLA Spools', 'Caliper Sets'],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'ws-2',
    title: 'Beginner CAD Modelling',
    slug: 'beginner-cad-modelling',
    tagline: 'Designing in 3 Dimensions with Tinkercad & Parametric Thinking',
    category: 'Design & Software',
    duration: '3.0 Hours',
    difficulty: 'Beginner',
    grades: 'Grades 6 - 8',
    maxStudents: 28,
    rating: 4.95,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Transform mental concepts into precise digital geometry! Students master spatial reasoning using Autodesk Tinkercad, learning geometric primitives, boolean cutouts, grouping, and dimension scaling.',
    learningOutcomes: [
      'Master the workplane, alignment, and grouping tools in Autodesk Tinkercad',
      'Apply boolean operations (holes vs solid bodies) to engineer hollow structures',
      'Calculate metric dimensions, wall thickness, and print tolerances',
      'Export production-ready STL files for immediate 3D printing'
    ],
    softwareUsed: ['Autodesk Tinkercad', 'Autodesk Fusion (Demo)'],
    hardwareIncluded: ['Touchscreen Laptops', 'Precision Mice', 'Stylus Pads'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'ws-3',
    title: 'Digital Fabrication',
    slug: 'digital-fabrication',
    tagline: 'Multi-Tool Creation: Laser Cutting, Vinyl Plotting & 3D Extrusion',
    category: 'Makerspace Core',
    duration: '4.0 Hours',
    difficulty: 'Intermediate',
    grades: 'Grades 7 - 9',
    maxStudents: 25,
    rating: 4.88,
    reviewsCount: 87,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'A deep-dive maker journey exploring how modern factories craft custom parts. Students compare additive (3D printing) versus subtractive/2D cutting technologies to solve real mechanical challenges.',
    learningOutcomes: [
      'Compare subtractive, additive, and formative manufacturing workflows',
      'Design vector flat-packs that assemble into 3D interlocking models',
      'Inspect material strengths, stress points, and shear resistance',
      'Iterate on physical prototypes based on real-world fit tests'
    ],
    softwareUsed: ['Inkscape', 'Tinkercad', 'LightBurn (Preview)'],
    hardwareIncluded: ['CO2 Laser Cutter (filtered)', 'Vinyl Cutter', '3D Printers'],
    color: 'from-purple-500 to-indigo-600'
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
    rating: 4.92,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    description: 'How do NASA and tech startups develop inventions in record time? Students work in engineering squads to brainstorm, sketch, CAD model, and 3D print functional gadgets within a single energetic session.',
    learningOutcomes: [
      'Implement the Stanford d.school Design Thinking framework',
      'Rapid cardboard-to-CAD translation and iterative refinement',
      'Optimize print speed, layer height, and structural infill patterns',
      'Pitch and demonstrate functional prototypes to peer reviewers'
    ],
    softwareUsed: ['Autodesk Tinkercad', 'Bambu Studio'],
    hardwareIncluded: ['High-speed CoreXY 3D Printers', 'Rapid Prototyping Kits'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'ws-5',
    title: 'Creative STEM Projects',
    slug: 'creative-stem-projects',
    tagline: 'Robotics Shells, Bio-Mimicry & Wearable Tech',
    category: 'Applied STEM',
    duration: '4.0 Hours',
    difficulty: 'All Levels',
    grades: 'Grades 6 - 9',
    maxStudents: 32,
    rating: 4.97,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'Fuse electronics, code, and 3D printed enclosures. Students build custom robotic chassis, sensor housings, and kinetic sculptures while learning how custom fabrication supercharges scientific inquiry.',
    learningOutcomes: [
      'Design snap-fit enclosures for micro:bit and Arduino sensors',
      'Understand press-fits, screws, and assembly tolerances in 3D prints',
      'Incorporate bio-inspired kinetic mechanisms (hinges, gears, grippers)',
      'Complete a take-home physical engineering artifact'
    ],
    softwareUsed: ['Tinkercad Circuits & 3D', 'MakeCode'],
    hardwareIncluded: ['Micro:bit V2 Kits', 'Servo Motors', 'Dual-color PLA'],
    color: 'from-rose-500 to-pink-600'
  }
];

export const FEATURED_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Modular Planetary Gearbox',
    student: 'Maya Patel (Grade 8)',
    school: 'Horizon Science Academy',
    software: 'Autodesk Tinkercad',
    printTime: '2h 15m',
    filament: 'Recycled PLA (Cyan / Amber)',
    likes: 184,
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80',
    description: 'A 4:1 reduction planetary gear system designed for a solar-powered educational rover challenge.',
    tags: ['Mechanical', 'Gears', 'Kinetic']
  },
  {
    id: 'proj-2',
    title: 'Ergonomic Adaptive Pencil Grip',
    student: 'Jordan Lee (Grade 7)',
    school: 'Oakridge Middle School',
    software: 'Autodesk Tinkercad',
    printTime: '45m',
    filament: 'Flexible TPU',
    likes: 215,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    description: 'Designed to help students with fine motor control challenges hold writing utensils comfortably.',
    tags: ['Assistive Tech', 'Ergonomics', 'Healthcare']
  },
  {
    id: 'proj-3',
    title: 'Micro-Hydroponic Seed Sprouter',
    student: 'Liam & Sofia (Grade 8)',
    school: 'Lincoln STEM Magnet',
    software: 'Autodesk Fusion',
    printTime: '3h 10m',
    filament: 'Waterproof PETG',
    likes: 167,
    image: 'https://images.unsplash.com/photo-1581092582845-a4b51826cf88?auto=format&fit=crop&w=600&q=80',
    description: 'An aerated container insert designed to germinate herbs on classroom windowsills with zero soil.',
    tags: ['Sustainability', 'Biology', 'Green Tech']
  },
  {
    id: 'proj-4',
    title: 'Mars Habitat Hex-Dome',
    student: 'Zackary Kim (Grade 6)',
    school: 'West Valley Middle',
    software: 'Autodesk Tinkercad',
    printTime: '1h 50m',
    filament: 'Terracotta Matte PLA',
    likes: 193,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Interlocking geodesic dome tiles engineered to resist pressure differentials in a simulated Mars simulation.',
    tags: ['Aerospace', 'Architecture', 'STEM']
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'The mobile makerspace van pulled right into our school bus bay, and within 30 minutes, 60 of our 7th graders were designing 3D prototypes on CAD laptops. It completely revolutionized our STEM week.',
    author: 'Dr. Robert Vance',
    role: 'Principal',
    institution: 'Lincoln Middle School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 't-2',
    quote: 'Middle schoolers learn best when they can touch what they imagine. MakerSpace on Wheels gave our students the thrill of watching a digital file they built on screen turn into a plastic gear in their hands.',
    author: 'Sarah Jenkins',
    role: 'STEM Department Head',
    institution: 'Crestview Middle School',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 't-3',
    quote: 'I used to think CAD was only for older college engineers. In just 2 hours, I learned Tinkercad and printed my own headphone cable organizer that actually clipped onto my backpack!',
    author: 'Alex Rivera',
    role: '8th Grade Student',
    institution: 'Oakridge Middle School',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'School Books Online',
    description: 'Teachers or administrators select their workshop, student count, and date. Our team confirms logistics and van parking requirements.',
    icon: 'CalendarCheck'
  },
  {
    step: '02',
    title: 'Mobile Lab Arrives',
    description: 'Our high-tech Maker Van rolls up equipped with 12+ high-speed 3D printers, design laptops, raw filaments, and safety gear.',
    icon: 'Truck'
  },
  {
    step: '03',
    title: 'Hands-on CAD Mastery',
    description: 'Expert instructors guide students through intuitive 3D modeling challenges in Tinkercad, building spatial intuition and teamwork.',
    icon: 'Box'
  },
  {
    step: '04',
    title: 'Live 3D Print & Take Home',
    description: 'Every student monitors their physical creation coming off the build plate and receives an official Junior Maker Certificate.',
    icon: 'Award'
  }
];

export const DEMO_USERS = [
  {
    role: 'Student',
    roleKey: 'student',
    name: 'Alex Rivera',
    email: 'alex.rivera@student.oakridge.edu',
    title: '8th Grade STEM Scholar',
    school: 'Oakridge Middle School',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    badge: 'Level 3 Maker'
  },
  {
    role: 'Teacher',
    roleKey: 'teacher',
    name: 'Sarah Jenkins',
    email: 'sjenkins@crestview.k12.us',
    title: 'Science & Robotics Lead',
    school: 'Crestview Middle School',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    badge: 'STEM Ambassador'
  },
  {
    role: 'School Administrator',
    roleKey: 'school',
    name: 'Dr. Robert Vance',
    email: 'rvance@lincolnmiddle.edu',
    title: 'Principal & Curriculum Director',
    school: 'Lincoln Middle School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    badge: 'District Partner'
  },
  {
    role: 'Workshop Instructor',
    roleKey: 'instructor',
    name: 'Marcus Chen',
    email: 'marcus.chen@makerspaceonwheels.org',
    title: 'Lead Mobile Fabrication Specialist',
    school: 'MakerSpace Mobile Fleet 1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    badge: 'Certified Master Maker'
  },
  {
    role: 'Super Admin',
    roleKey: 'admin',
    name: 'Elena Rostova',
    email: 'elena@makerspaceonwheels.org',
    title: 'Director of Operations & Fleet',
    school: 'MakerSpace Global HQ',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    badge: 'Platform Administrator'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-1082',
    schoolName: 'Lincoln Middle School',
    contactPerson: 'Dr. Robert Vance',
    email: 'rvance@lincolnmiddle.edu',
    phone: '+1 (555) 382-9102',
    workshopTitle: 'Introduction to 3D Printing',
    date: '2026-11-20',
    studentsCount: 35,
    status: 'Confirmed',
    instructor: 'Marcus Chen',
    vanId: 'Van-Alpha-01',
    amount: '$650'
  },
  {
    id: 'BK-1083',
    schoolName: 'Oakridge Middle School',
    contactPerson: 'Sarah Jenkins',
    email: 'sjenkins@crestview.k12.us',
    phone: '+1 (555) 472-8819',
    workshopTitle: 'Beginner CAD Modelling',
    date: '2026-11-24',
    studentsCount: 28,
    status: 'Pending',
    instructor: 'Unassigned',
    vanId: 'Van-Beta-02',
    amount: '$600'
  },
  {
    id: 'BK-1084',
    schoolName: 'West Valley STEM Academy',
    contactPerson: 'Michael Chang',
    email: 'mchang@westvalleystem.org',
    phone: '+1 (555) 609-3221',
    workshopTitle: 'Rapid Prototyping',
    date: '2026-12-02',
    studentsCount: 40,
    status: 'Confirmed',
    instructor: 'Marcus Chen',
    vanId: 'Van-Alpha-01',
    amount: '$800'
  },
  {
    id: 'BK-1085',
    schoolName: 'St. Jude Preparatory',
    contactPerson: 'Claire Bennett',
    email: 'cbennett@stjudeprep.org',
    phone: '+1 (555) 721-4900',
    workshopTitle: 'Creative STEM Projects',
    date: '2026-12-10',
    studentsCount: 30,
    status: 'Completed',
    instructor: 'David Reynolds',
    vanId: 'Van-Gamma-03',
    amount: '$750'
  }
];

export const INITIAL_STUDENT_COURSES = [
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
];

export const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-1',
    title: 'Planetary Gear Reducer',
    student: 'Alex Rivera',
    date: '2026-11-08',
    fileType: 'STL (3.4 MB)',
    status: 'Approved',
    feedback: 'Outstanding dimensional accuracy! The teeth clearance of 0.3mm printed smoothly with zero binding.',
    score: '98 / 100',
    reviewer: 'Marcus Chen'
  },
  {
    id: 'sub-2',
    title: 'Custom Hydroponic Net Cup',
    student: 'Alex Rivera',
    date: '2026-11-10',
    fileType: 'STL (1.8 MB)',
    status: 'In Review',
    feedback: 'Queued on Bambu X1-Carbon build plate #2. Overhangs look well supported.',
    score: 'Pending',
    reviewer: 'Marcus Chen'
  }
];

