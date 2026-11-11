import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Workshops } from './pages/Workshops';
import { SchoolRegistration } from './pages/SchoolRegistration';
import { CadHub } from './pages/CadHub';
import { StudentLearning } from './pages/StudentLearning';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { NotFound } from './pages/NotFound';

// Dashboards
import { AdminDashboard } from './dashboards/AdminDashboard';
import { SchoolDashboard } from './dashboards/SchoolDashboard';
import { InstructorDashboard } from './dashboards/InstructorDashboard';
import { TeacherDashboard } from './dashboards/TeacherDashboard';
import { StudentDashboard } from './dashboards/StudentDashboard';

// Public Layout with Navbar & Footer
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <Routes>
      {/* Public Pages wrapped in Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/school-registration" element={<SchoolRegistration />} />
        <Route path="/cad-hub" element={<CadHub />} />
        <Route path="/learning" element={<StudentLearning />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Role-Based Dashboard Routes */}
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/school" element={<SchoolDashboard />} />
      <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />
    </Routes>
  );
};

export default App;

