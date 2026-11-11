import React from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, Sparkles, Layers, Cpu, Award } from 'lucide-react';

export const WorkshopDetailModal = ({ isOpen, onClose, workshop, onBook }) => {
  if (!isOpen || !workshop) return null;

  const agenda = [
    {
      time: '00:00 - 00:30',
      title: 'Van Lab Orientation & Safety Briefing',
      desc: 'Students board the mobile lab or gather in the host room. Overview of molten filament safety (215°C hotends), Cartesian XYZ axes, and additive mechanics.'
    },
    {
      time: '00:30 - 01:45',
      title: 'Hands-on CAD Modeling & Design Challenge',
      desc: 'Students open Autodesk Tinkercad on provided touchscreen laptops. Instructors guide them through geometric boolean operations, wall thickness tolerances, and snap-fit assemblies.'
    },
    {
      time: '01:45 - 02:15',
      title: 'Slicing & Toolpath Generation',
      desc: 'Exporting STL files into Bambu Studio / PrusaSlicer. Students select infill density (15-20%), inspect preview layers, and send their file to the 12-printer farm.'
    },
    {
      time: '02:15 - End',
      title: 'Physical Extraction, QC & Junior Maker Awards',
      desc: 'Students observe their physical models cooling on PEI spring steel sheets, perform dimensional caliper checks, and receive their certified Junior Maker certificates.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
              {workshop.category}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60">
              {workshop.difficulty}
            </span>
            <span className="text-xs font-mono text-slate-400">⏱ {workshop.duration}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {workshop.title}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-cyan-400">
            {workshop.tagline}
          </p>
        </div>

        {/* Overview */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {workshop.description}
        </div>

        {/* Detailed Hour-by-Hour Agenda */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Hour-by-Hour Workshop Syllabus</span>
          </h4>
          <div className="space-y-2.5">
            {agenda.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="font-mono text-cyan-400 text-[11px]">{item.time}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware & Software Brought */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Software Stack
            </span>
            <p className="font-bold text-white">{workshop.softwareUsed.join(', ')}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Hardware Included
            </span>
            <p className="font-bold text-white">{workshop.hardwareIncluded.join(', ')}</p>
          </div>
        </div>

        {/* Bottom Booking CTA */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Capacity: <strong className="text-white">{workshop.maxStudents} Students</strong></span> • 
            <span className="ml-1 text-emerald-400">All materials included</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(workshop);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book for Your School</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
