import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { 
  Building, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  Truck, 
  Award,
  Sparkles,
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BookingModal } from '../components/BookingModal';

export const SchoolDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const schoolVisits = [
    {
      id: 'BK-1082',
      workshop: 'Introduction to 3D Printing',
      date: '2026-11-20',
      status: 'Confirmed',
      studentsCount: 35,
      instructor: 'Marcus Chen',
      van: 'Van-Alpha-01',
      location: 'Main Bus Courtyard'
    },
    {
      id: 'BK-0914',
      workshop: 'Beginner CAD Modelling',
      date: '2026-09-15',
      status: 'Completed',
      studentsCount: 32,
      instructor: 'Marcus Chen',
      van: 'Van-Alpha-01',
      location: 'Gymnasium Entrance'
    }
  ];

  return (
    <DashboardLayout
      title="School Administrator Portal"
      subtitle={`District Management for ${user?.school || 'Lincoln Middle School'}`}
    >
      {/* School Profile Summary Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
              Registered STEM Partner School
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">{user?.school || 'Lincoln Middle School'}</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Designated Bus Loading Stalls #1 & #2 • Point of Contact: <strong className="text-cyan-300">{user?.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 transition flex items-center gap-2 shrink-0"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Next Mobile Lab Visit</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">Total Middle Schoolers Trained</div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono">67 Students</div>
          <div className="text-[11px] text-emerald-400 mt-1">100% completion rate</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">Upcoming Lab Date</div>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">Nov 20</div>
          <div className="text-[11px] text-slate-400 mt-1">Van-Alpha-01 Confirmed</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">Physical 3D Prints Delivered</div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono">67 Objects</div>
          <div className="text-[11px] text-cyan-400 mt-1">Zero misprints</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800">
          <div className="text-slate-400 text-xs">STEM Certificates Awarded</div>
          <div className="text-2xl font-extrabold text-purple-400 mt-1 font-mono">32 Verified</div>
          <div className="text-[11px] text-purple-400 mt-1">Viewable in registry</div>
        </div>
      </div>

      {/* Workshop Booking Status & Timeline */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Mobile Van Lab Schedule & Itinerary</h3>
            <p className="text-xs text-slate-400">Track logistics for your upcoming and past fabrication visits</p>
          </div>
          <button
            onClick={() => showToast('Generated administrative PDF impact report.', 'success')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export District Report</span>
          </button>
        </div>

        <div className="space-y-3">
          {schoolVisits.map((v) => (
            <div key={v.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{v.workshop}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    v.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {v.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex flex-wrap gap-x-4">
                  <span>📅 Date: <strong className="text-white">{v.date}</strong></span>
                  <span>🚐 Van Unit: <strong className="text-cyan-300">{v.van}</strong></span>
                  <span>👨‍🏫 Lead Instructor: <strong className="text-white">{v.instructor}</strong></span>
                  <span>👥 Cohort: <strong className="text-white">{v.studentsCount} Students</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Van dispatch hotline connected for ${v.id}.`, 'info')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                >
                  Contact Driver & Instructor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </DashboardLayout>
  );
};

