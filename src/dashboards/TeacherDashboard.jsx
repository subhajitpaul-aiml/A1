import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Award, 
  Download, 
  Sparkles, 
  CheckCircle,
  Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleExportCertificates = () => {
    showToast('Batch exported 28 Junior Maker Certificates (ZIP).', 'success');
  };

  return (
    <DashboardLayout
      title="Teacher & STEM Educator Hub"
      subtitle={`Welcome, ${user?.name || 'Sarah Jenkins'} • Science & Technology Dept`}
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">Assigned Class Period</div>
          <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">Period 3 & 4 STEM</div>
          <div className="text-[11px] text-cyan-400 mt-1">28 Enrolled Students</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">Next Mobile Lab Day</div>
          <div className="text-xl sm:text-2xl font-extrabold text-orange-400 mt-1 font-mono">Nov 24, 2026</div>
          <div className="text-[11px] text-slate-400 mt-1">Van-Beta-02 Confirmed</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">Curriculum Standards</div>
          <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">NGSS MS-ETS1</div>
          <div className="text-[11px] text-emerald-400 mt-1">Engineering Design Aligned</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">Class Completion</div>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-400 mt-1 font-mono">92%</div>
          <div className="text-[11px] text-purple-400 mt-1">Tinkercad Modules Complete</div>
        </div>
      </div>

      {/* Curriculum Guides & Classroom Downloads */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Lesson Plans & Teacher Preparation Guides</span>
            </h3>
            <p className="text-xs text-slate-400">Classroom worksheets to prime your students prior to the mobile lab van visit</p>
          </div>
          <button
            onClick={handleExportCertificates}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center gap-1.5 shadow-glow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All Certificates</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">Guide #1</span>
            <h4 className="font-bold text-white text-sm">Pre-Visit Tinkercad Quickstart</h4>
            <p className="text-xs text-slate-400">A 20-minute classroom activity introducing workplanes and boolean shapes.</p>
            <button
              onClick={() => showToast('Downloaded Tinkercad Quickstart Worksheet.', 'info')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 pt-1"
            >
              <Download className="w-3 h-3" /> Download PDF
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-orange-300">Guide #2</span>
            <h4 className="font-bold text-white text-sm">3D Printing Safety & Polymers</h4>
            <p className="text-xs text-slate-400">Teaches students about nozzle temperatures (215°C) and biodegradable PLA.</p>
            <button
              onClick={() => showToast('Downloaded Safety & Polymer Guide.', 'info')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 pt-1"
            >
              <Download className="w-3 h-3" /> Download PDF
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-300">Guide #3</span>
            <h4 className="font-bold text-white text-sm">Post-Visit Engineering Rubric</h4>
            <p className="text-xs text-slate-400">Grading rubric assessing student design iterations and physical fit tolerance.</p>
            <button
              onClick={() => showToast('Downloaded Engineering Rubric.', 'info')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 pt-1"
            >
              <Download className="w-3 h-3" /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

