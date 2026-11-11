# MakerSpace on Wheels 🚐⚡
> **"Turn Your Ideas Into Reality."**  
> *Tagline: Learn. Design. Create. Innovate.*

A modern, responsive, full-stack educational technology platform for a mobile makerspace and 3D printing laboratory designed for middle-school students (Grades 6–9). 

The platform connects **schools, students, teachers, workshop instructors, and fleet administrators** through an interactive digital platform and on-site mobile van residencies.

---

## 🛠 1. Technology Stack

- **Frontend:** React.js 18, Vite 6, Tailwind CSS 3, React Router DOM v6, Lucide Icons, Three.js (Interactive WebGL 3D CAD Viewport), Canvas-Confetti
- **Backend:** Node.js, Express.js (REST API on port 5000)
- **Database:** Supabase / PostgreSQL schema with Row Level Security (RLS) policies and in-memory mock fallback store for zero-setup execution
- **Architecture:** Client-Server decoupled architecture with proxy routing and fallback resilience

---

## 🚀 2. Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended, tested on Node v24)
- npm (v9+)

### Installation
Dependencies are already installed in this directory. If running on a new clone:
```bash
npm install
```

### Running the Application

You can run both the frontend and backend concurrently or independently:

#### Option A: Run Full-Stack (Frontend + Backend simultaneously)
```bash
npm run dev:all
```
- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)

#### Option B: Run Frontend Only
```bash
npm run dev
```
*(The frontend has automated fallback to mock data if the backend is not running)*

#### Option C: Run Backend Only
```bash
npm run server
```

---

## 🌐 3. Main Website Pages

| Page | Route | Description |
| :--- | :--- | :--- |
| **Home Page** | `/` | Hero section ("Turn Your Ideas Into Reality."), Interactive 3D Model Viewer, Project Overview, Core Learning Programs, 4-Step Process, Featured Student Inventions, Testimonials, and Booking CTA |
| **About Page** | `/about` | Project mission & vision, STEM educational objectives, why 3D printing matters for middle schoolers, and Mobile Maker Van specifications |
| **Workshops Catalog** | `/workshops` | All 5 core programs with search, category filtering, difficulty level, learning outcomes, hardware/software specifications, and direct booking modal |
| **School Registration** | `/school-registration` | Multi-section booking form for school principals/educators with parking confirmation, date selection, cohort size, validation, and confetti confirmation |
| **3D & CAD Hub** | `/cad-hub` | Educational section: What is 3D printing (FDM, infill, slicing), What is CAD, 4-stage digital-to-physical pipeline, curated links to **Autodesk Tinkercad** & **Autodesk Fusion**, and live 3D mesh explorer |
| **Student Learning** | `/learning` | Enrolled courses, step-by-step CAD modules, 3D project STL submission modal, and downloadable/verifiable Junior Maker Certificate |
| **Contact Page** | `/contact` | Mobile dispatch hotline, email, service regions, interactive FAQ accordion, and inquiry form |
| **Sign In** | `/login` | Authentication interface with 1-click role switcher pills for quick testing across all 5 roles |
| **Sign Up** | `/signup` | User registration with role selection |

---

## 👥 4. Role-Based Dashboards

The system supports **5 distinct user roles** with dedicated dashboard layouts:

1. **Super Admin Dashboard** (`/dashboard/admin`):
   - Fleet KPIs: total schools (48), students (3,420), pending bookings, active mobile vans
   - Real-time Mobile Van status (Alpha-01, Beta-02, Gamma-03)
   - Booking management table: Approve, mark completed, or cancel with instant state updates
   - User directory and fleet routing overview

2. **School Administrator Dashboard** (`/dashboard/school`):
   - School profile and bus loop parking status
   - Mobile lab visit itinerary (Confirmed dates & past workshops)
   - Student participant headcounts
   - Administrative district impact reports export (PDF summary)

3. **Workshop Instructor Dashboard** (`/dashboard/instructor`):
   - Mobile lab fleet console (12x Bambu CoreXY printer telemetry, nozzle temperatures, battery charge)
   - Today's assigned school location and contact
   - Student cohort attendance roster (toggle present/absent)
   - Student STL project review queue with slicer feedback

4. **Teacher Dashboard** (`/dashboard/teacher`):
   - STEM class period tracking (28 students enrolled)
   - NGSS engineering design curriculum alignment (MS-ETS1)
   - Downloadable classroom worksheets (Tinkercad Quickstart, Polymer Safety, Engineering Rubric)
   - Batch certificate export

5. **Student Dashboard** (`/dashboard/student`):
   - Enrolled CAD courses and progress bars
   - "Submit New 3D Design" modal with STL validation
   - Personal interactive 3D model viewport to inspect prints in 360°
   - Submission review history and feedback

> 💡 **Quick Role Switching:** On any dashboard or in the top navigation bar, click the profile avatar or the sidebar pills to instantly switch between the 5 roles without having to re-authenticate!

---

## 🖨️ 5. Interactive 3D Model CAD Viewer

Located on the **Home Page**, **CAD Hub**, and **Student Dashboard**:
- Powered by **Three.js** with hardware-accelerated WebGL
- Switch between 4 models: **Planetary Gear**, **MakerSpace Van**, **STEM Rocket**, and **XYZ Calibration Cube**
- **360° Mouse Orbit Control:** Click and drag to inspect models from any angle
- **Filament Palette Selector:** Switch print colors (Cyan PLA, Amber Orange, Laser Violet, Eco Emerald, Titanium White)
- **Wireframe Toggle:** Switch between solid shaded surface and CAD polygon triangular mesh to visualize STL tessellation
- **Real-time Telemetry HUD:** Displays triangle count, millimeter height, and cubic volume

---

## 🗄️ 6. Backend API & Supabase Integration

### API Endpoints
- `GET /api/health` - Server status & project metadata
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/workshops` - List all workshops
- `GET /api/workshops/:id` - Workshop details
- `GET /api/bookings` - List all school bookings
- `POST /api/bookings` - Create new workshop booking
- `PATCH /api/bookings/:id/status` - Update booking status (`Confirmed`, `Pending`, `Completed`, `Cancelled`)
- `GET /api/schools` - List registered partner schools
- `POST /api/schools` - Register new school
- `GET /api/submissions` - List student 3D design submissions
- `POST /api/submissions` - Submit project for 3D printing
- `GET /api/attendance` - Get cohort attendance
- `POST /api/attendance/mark` - Mark student present/absent
- `GET /api/stats` - Platform analytics & KPIs

### Supabase / PostgreSQL Setup
1. A complete PostgreSQL schema script is provided in [`server/schema.sql`](file:///server/schema.sql).
2. Open your [Supabase Dashboard](https://supabase.com/) -> SQL Editor.
3. Paste and run the contents of [`server/schema.sql`](file:///server/schema.sql) to generate the tables, indexes, constraints, and Row Level Security policies.
4. Copy your project URL and service role / anon keys into [`server/.env`](file:///server/.env):
   ```env
   PORT=5000
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-public-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
   ```
5. When valid credentials are present, the server automatically reads and writes directly to Supabase. If credentials are omitted, the server seamlessly runs using its rich in-memory mock database.

---

## 📁 7. Code Structure

```
├── index.html                   # HTML entry point with fonts & meta
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Custom STEM color palette & glow effects
├── vite.config.js               # Vite config with API proxy
├── src/
│   ├── App.jsx                  # Main routing definition
│   ├── main.jsx                 # React root & providers
│   ├── components/
│   │   ├── Navbar.jsx           # Glassmorphism header with role switcher
│   │   ├── Footer.jsx           # STEM platform footer & newsletter
│   │   ├── ModelViewer3D.jsx    # Three.js 3D CAD interactive viewer
│   │   └── BookingModal.jsx     # Booking modal with instant confirmation
│   ├── context/
│   │   ├── AuthContext.jsx      # Role authentication state & 1-click switcher
│   │   └── ToastContext.jsx     # Toast notification system
│   ├── dashboards/
│   │   ├── DashboardLayout.jsx  # Shared dashboard frame & sidebar
│   │   ├── AdminDashboard.jsx   # Super Admin fleet & booking management
│   │   ├── SchoolDashboard.jsx  # School profile, visits & district reports
│   │   ├── InstructorDashboard.jsx # Van status, attendance & STL review
│   │   ├── TeacherDashboard.jsx # Classroom roster & lesson plan guides
│   │   └── StudentDashboard.jsx # Courses, project queue & 3D viewer
│   ├── pages/
│   │   ├── Home.jsx             # Landing page with all requested sections
│   │   ├── About.jsx            # Mission, vision, mobile van specs
│   │   ├── Workshops.jsx        # 5 learning programs with search & filters
│   │   ├── SchoolRegistration.jsx # Comprehensive school booking form
│   │   ├── CadHub.jsx           # 3D Printing, CAD, Tinkercad & Fusion guide
│   │   ├── StudentLearning.jsx  # Student modules, submissions & certificate
│   │   ├── Contact.jsx          # Hotline, FAQ accordion & inquiry form
│   │   ├── Login.jsx            # Sign in with 1-click demo accounts
│   │   ├── Signup.jsx           # Account creation interface
│   │   └── NotFound.jsx         # 404 error page
│   ├── services/
│   │   ├── api.js               # Frontend API client with fallback sync
│   │   └── mockData.js          # Realistic starter datasets & demo users
│   └── styles/
│       └── index.css            # Tailwind directives, custom glassmorphism
└── server/
    ├── server.js                # Express REST API server
    ├── schema.sql               # Production PostgreSQL / Supabase DDL
    ├── .env                     # Server environment variables
    ├── .env.example             # Template for secrets
    ├── config/
    │   └── supabase.js          # Supabase client initializer
    ├── data/
    │   └── mockDatabase.js      # In-memory mock database store
    └── routes/
        ├── auth.js              # Authentication endpoints
        ├── workshops.js         # Workshop endpoints
        ├── bookings.js          # Booking & status endpoints
        ├── schools.js           # School endpoints
        ├── students.js          # Student module endpoints
        ├── submissions.js       # Project review endpoints
        ├── attendance.js        # Attendance marking endpoints
        └── stats.js             # Platform KPI endpoints
```

---

## 🧪 8. Testing & Verification

1. **Frontend Build:** Verified with `npm run build` — compiles cleanly in under 6s with 0 errors.
2. **Backend API:** Tested with `GET /api/health`, `GET /api/workshops`, `POST /api/bookings`, and `GET /api/stats` — all returning 200/201 responses.
3. **Responsive Design:** Tested for mobile phones, tablets, and desktop displays.
4. **Interactive 3D:** Tested with Three.js WebGL rotation, filament color change, and wireframe mesh toggling.

