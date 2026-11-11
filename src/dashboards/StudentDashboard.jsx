import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { 
  BookOpen, 
  Upload, 
  Award, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Box, 
  Download,
  ExternalLink,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { INITIAL_STUDENT_COURSES, INITIAL_SUBMISSIONS } from '../services/mockData';
import { ModelViewer3D } from '../components/ModelViewer3D';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [courses] = useState(INITIAL_STUDENT_COURSES);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const newEntry = {
      id: `sub-${Date.now()}`,
      title: newTitle,
      student: user?.name || 'Alex Rivera',
      date: new Date().toISOString().split('T')[0],
      fileType: 'STL (2.4 MB)',
      status: 'In Review',
      feedback: 'Model uploaded from Student Dashboard. Pre-flight slice verification in progress.',
      score: 'Pending',
      reviewer: 'Marcus Chen'
    };
    setSubmissions([newEntry, ...submissions]);
    setNewTitle('');
    setShowSubmitModal(false);
    confetti({ particleCount: 70, spread: 60 });
    showToast('Your 3D design has been queued for the mobile lab van!', 'success');
  };

  return (
    <DashboardLayout
      title="Student Maker Station"
      subtitle={`Welcome back, ${user?.name || 'Alex Rivera'} • ${user?.school || 'Oakridge Middle School'}`}
    >
      {/* Student Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maker Level 3 Scholar</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Keep Creating, {user?.name.split(' ')[0] || 'Alex'}!</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Your 3D models are printed inside the MakerSpace on Wheels mobile van during school lab visits.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 transition flex items-center gap-2 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Submit New 3D Design</span>
        </button>
      </div>

      {/* 2-Column: Courses & Live 3D Inspect */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Enrolled Courses */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Enrolled CAD & 3D Printing Modules</span>
            </h3>
            <span className="text-xs text-slate-400">3 Courses</span>
          </div>

          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl glass-card border border-slate-800 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {c.category}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1">{c.title}</h4>
                  </div>
                  <span className={`text-[11px] font-semibold ${c.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {c.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{c.completedLessons} of {c.lessonsCount} lessons</span>
                    <span className="font-bold text-cyan-300">{c.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${c.progress === 100 ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Personal 3D Model Viewport */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-orange-400" />
              <span>Inspect Your 3D Prints</span>
            </h3>
            <span className="text-xs text-slate-400">Interactive 360°</span>
          </div>
          <ModelViewer3D initialModel="rocket" height="320px" />
        </div>

      </div>

      {/* Project Submissions Queue */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>My 3D Print Submissions</span>
        </h3>

        <div className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{sub.title}</h4>
                  <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-slate-800">{sub.fileType}</span>
                </div>
                <p className="text-xs text-slate-400">Submitted: {sub.date}</p>
                <p className="text-xs text-slate-300 italic">Reviewer Feedback: "{sub.feedback}"</p>
              </div>

              <div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  sub.status === 'Approved' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}>
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Submit 3D Design to Van</h3>
            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Hexagonal Drone Propeller Guard"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-700 rounded-xl text-center space-y-1 bg-slate-950/50">
                <Upload className="w-5 h-5 text-cyan-400 mx-auto" />
                <p className="text-xs text-slate-300 font-semibold">Tinkercad STL file attached</p>
                <p className="text-[10px] text-slate-500">Auto-validated 0.2mm mesh</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
                >
                  Upload & Queue Print
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

