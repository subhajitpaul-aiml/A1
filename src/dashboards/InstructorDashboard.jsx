import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { 
  Truck, 
  Calendar, 
  CheckSquare, 
  Square, 
  FileCheck, 
  Printer, 
  Clock, 
  UserCheck, 
  Sparkles,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const InstructorDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [studentRoster, setStudentRoster] = useState([
    { id: 'st-1', name: 'Alex Rivera', grade: '8th Grade', present: true, modelReady: true, printStatus: 'Printed' },
    { id: 'st-2', name: 'Jordan Lee', grade: '7th Grade', present: true, modelReady: true, printStatus: 'Printing (Plate #2)' },
    { id: 'st-3', name: 'Maya Patel', grade: '8th Grade', present: true, modelReady: true, printStatus: 'Queued' },
    { id: 'st-4', name: 'Zackary Kim', grade: '7th Grade', present: false, modelReady: false, printStatus: 'Absent' },
    { id: 'st-5', name: 'Liam Foster', grade: '8th Grade', present: true, modelReady: true, printStatus: 'Printed' }
  ]);

  const [projectReviews, setProjectReviews] = useState([
    {
      id: 'sub-101',
      title: 'Planetary Gear Box Assembly',
      student: 'Maya Patel',
      software: 'Tinkercad',
      status: 'Ready to Print',
      sliceNotes: '0.20mm layer, 15% infill, overhangs < 45°',
      fileSize: '3.4 MB'
    },
    {
      id: 'sub-102',
      title: 'Custom Hydroponic Seed Net Pot',
      student: 'Liam Foster',
      software: 'Autodesk Fusion',
      status: 'Needs Mesh Adjustment',
      sliceNotes: 'Base wall thickness 0.8mm is too thin. Advise thickening to 1.6mm.',
      fileSize: '1.9 MB'
    }
  ]);

  const toggleAttendance = (id) => {
    setStudentRoster(prev => prev.map(s => {
      if (s.id === id) {
        const updated = !s.present;
        showToast(`${s.name} marked ${updated ? 'Present' : 'Absent'}`, 'info');
        return { ...s, present: updated };
      }
      return s;
    }));
  };

  const approveProject = (id) => {
    setProjectReviews(prev => prev.map(p => p.id === id ? { ...p, status: 'Sent to Bambu Plate #3' } : p));
    showToast(`Project ${id} approved and queued for live 3D print!`, 'success');
  };

  return (
    <DashboardLayout
      title="Workshop Instructor Lab Console"
      subtitle={`Mobile Unit Lead: ${user?.name || 'Marcus Chen'} • Fleet Unit Alpha-01`}
    >
      {/* Active Session Hardware Bar */}
      <div className="p-5 rounded-2xl glass-card border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Van Unit Alpha-01 Fleet Status</h3>
            <p className="text-xs text-slate-400">12x Bambu CoreXY 3D Printers Online • Nozzle Temp 215°C • Battery 88%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
            ● Active Workshop in Progress
          </span>
        </div>
      </div>

      {/* Itinerary & School Location */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span>Today's Assigned Itinerary</span>
        </h3>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/70 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400">School:</span>
            <div className="font-bold text-white text-sm">Lincoln Middle School</div>
            <div className="text-slate-400">Courtyard Gate 3</div>
          </div>
          <div>
            <span className="text-slate-400">Program:</span>
            <div className="font-bold text-cyan-300 text-sm">Introduction to 3D Printing & CAD</div>
            <div className="text-slate-400">Session 2 of 3 • 35 Students</div>
          </div>
          <div>
            <span className="text-slate-400">Contact On-Site:</span>
            <div className="font-bold text-white text-sm">Dr. Robert Vance (Principal)</div>
            <div className="text-slate-400">Ext. 204 • Direct Dispatch</div>
          </div>
        </div>
      </div>

      {/* Attendance & Print Status Table */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Student Cohort Attendance & Print Queue</span>
            </h3>
            <p className="text-xs text-slate-400">Mark attendance to unlock student CAD laptops and print slots</p>
          </div>
          <span className="text-xs text-slate-300 font-mono">
            {studentRoster.filter(s => s.present).length} of {studentRoster.length} Present
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Grade</th>
                <th className="py-2.5 px-3">Attendance</th>
                <th className="py-2.5 px-3">CAD Design Ready</th>
                <th className="py-2.5 px-3">Physical 3D Print Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {studentRoster.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-bold text-white">{s.name}</td>
                  <td className="py-3 px-3 text-slate-400">{s.grade}</td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggleAttendance(s.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold text-[11px] transition ${
                        s.present
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {s.present ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                      <span>{s.present ? 'Present' : 'Absent'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[11px] font-semibold ${s.modelReady ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {s.modelReady ? '✓ STL Uploaded' : 'Drafting in Tinkercad'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                      {s.printStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student 3D Project Review Queue */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Pending Student STL Project Reviews</span>
        </h3>

        <div className="space-y-3">
          {projectReviews.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{p.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">{p.software}</span>
                </div>
                <p className="text-xs text-slate-400">By <strong className="text-slate-200">{p.student}</strong> • Size: {p.fileSize}</p>
                <p className="text-xs text-cyan-400/90 font-mono">Slicer Audit: {p.sliceNotes}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => approveProject(p.id)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition shadow-glow"
                >
                  Approve for Van Print
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </DashboardLayout>
  );
};

