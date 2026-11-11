import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Upload, 
  Award, 
  Sparkles, 
  PlayCircle, 
  FileText, 
  Layers, 
  ArrowRight,
  ExternalLink,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_STUDENT_COURSES, INITIAL_SUBMISSIONS } from '../services/mockData';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const StudentLearning = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState(INITIAL_STUDENT_COURSES);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'submissions' | 'certificate'
  
  // Submit design state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    title: '',
    description: '',
    software: 'Autodesk Tinkercad',
    fileType: 'STL (Standard 3D File)',
    studentName: 'Alex Rivera (Demo Student)'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!submitForm.title) {
      showToast('Please provide a project title.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitProject({
        title: submitForm.title,
        student: submitForm.studentName,
        fileType: `${submitForm.software} Export (2.1 MB)`
      });

      setSubmissions([res.submission, ...submissions]);
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
      setSubmitForm({
        title: '',
        description: '',
        software: 'Autodesk Tinkercad',
        fileType: 'STL (Standard 3D File)',
        studentName: 'Alex Rivera (Demo Student)'
      });

      confetti({ particleCount: 70, spread: 50 });
      showToast('Project design submitted to Mobile Lab queue!', 'success');
    } catch {
      setIsSubmitting(false);
      showToast('Submission error.', 'error');
    }
  };

  const handleDownloadCertificate = () => {
    confetti({ particleCount: 90, spread: 80 });
    showToast('Certificate generated! Print-ready PDF ready.', 'success');
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 inline-flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            Maker Academy Student Hub
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Student Learning <span className="gradient-text">Portal</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Track your CAD modeling modules, review 3D slicer training, upload engineering prototypes for review, and claim your certified maker badges.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-cyan-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses & Modules</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'submissions'
                ? 'bg-cyan-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Project Submissions ({submissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'certificate'
                ? 'bg-cyan-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificates & Badges</span>
          </button>
        </div>

        {/* TAB 1: COURSES & MODULES */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Your Enrolled STEM Modules</h3>
                <p className="text-xs text-slate-400">Step-by-step CAD video lessons and hands-on printing checklists</p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 transition flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Submit 3D Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 text-[10px] text-cyan-300 font-bold border border-cyan-800/40">
                        {c.category}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-900/90 text-xs font-mono text-slate-300">
                        {c.duration}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="font-bold text-white text-base leading-snug">{c.title}</h4>
                      
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Progress</span>
                          <span className="font-semibold text-cyan-300">{c.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              c.progress === 100 ? 'bg-emerald-500' : 'bg-cyan-500'
                            }`}
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                        <span>{c.completedLessons} of {c.lessonsCount} lessons</span>
                        <span className={`font-semibold ${c.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {c.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => showToast(`Opening module: ${c.title}`, 'info')}
                      className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition flex items-center justify-center gap-1.5"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{c.progress === 100 ? 'Review Lessons' : 'Continue Course'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Submitted 3D Models & Slicer Queue</h3>
                <p className="text-xs text-slate-400">Designs reviewed by mobile lab instructors before live physical printing</p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Submit New 3D Design</span>
              </button>
            </div>

            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono">
                        STL
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{sub.title}</h4>
                        <p className="text-xs text-slate-400">By {sub.student} • Date: {sub.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                        sub.status === 'Approved'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950/80 text-amber-300 border-amber-800'
                      }`}>
                        {sub.status}
                      </span>
                      {sub.score !== 'Pending' && (
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                          Score: {sub.score}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-slate-400">Instructor Feedback ({sub.reviewer}):</strong>
                    <p className="mt-0.5 text-slate-300 italic">"{sub.feedback}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATES */}
        {activeTab === 'certificate' && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-white">Your Junior Maker Certificate</h3>
              <p className="text-xs text-slate-400">Awarded for completing hands-on CAD modeling and live 3D print calibration.</p>
            </div>

            {/* Official Certificate Visual Card */}
            <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-cyan-500/50 shadow-glow relative overflow-hidden text-center space-y-6">
              
              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 text-xs font-mono text-cyan-500/50">MAKERSPACE-ON-WHEELS-STEM-2026</div>
              <div className="absolute bottom-4 right-4 text-xs font-mono text-cyan-500/50">VERIFICATION-ID: #MOW-84920</div>

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-cyan-400">Official Certificate of Achievement</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Junior Digital Fabrication Maker</h2>
                <p className="text-sm text-slate-400 mt-2">This is proudly presented to</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif mt-1">Alex Rivera</p>
                <p className="text-xs text-slate-400">Oakridge Middle School • 8th Grade STEM</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                For successfully designing, slicing, tolerancing, and manufacturing a functional mechanical artifact inside the MakerSpace on Wheels Mobile 3D Printing Lab.
              </p>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-400">
                <div>
                  <div className="font-serif italic text-white text-base">Marcus Chen</div>
                  <div className="text-[10px] text-slate-500">Lead Fabrication Instructor</div>
                </div>
                <div>
                  <div className="font-bold text-cyan-400">November 2026</div>
                  <div className="text-[10px] text-slate-500">Date Issued</div>
                </div>
                <div>
                  <div className="font-serif italic text-white text-base">Elena Rostova</div>
                  <div className="text-[10px] text-slate-500">Director of Mobile Fleet</div>
                </div>
              </div>

            </div>

            <div className="text-center">
              <button
                onClick={handleDownloadCertificate}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center gap-2 mx-auto shadow-glow"
              >
                <Download className="w-4 h-4" />
                <span>Download Print-Ready PDF Certificate</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Submit Project Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" />
              <span>Submit 3D Project to Mobile Lab</span>
            </h3>
            <p className="text-xs text-slate-400">
              Our mobile instructors will inspect your mesh in PrusaSlicer / Bambu Studio before sending to the 3D printer.
            </p>

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={submitForm.title}
                  onChange={(e) => setSubmitForm({ ...submitForm, title: e.target.value })}
                  placeholder="e.g. Ergonomic Whistle with Inner Ball"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Software Used</label>
                <select
                  value={submitForm.software}
                  onChange={(e) => setSubmitForm({ ...submitForm, software: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Autodesk Tinkercad">Autodesk Tinkercad</option>
                  <option value="Autodesk Fusion">Autodesk Fusion</option>
                  <option value="Blender / Other">Blender / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Design Notes & Slicing Infill Request</label>
                <textarea
                  rows={2}
                  value={submitForm.description}
                  onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                  placeholder="e.g. 15% gyroid infill, 0.2mm layer height. Designed with 0.3mm tolerance."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Upload Dropzone Simulation */}
              <div className="p-4 border-2 border-dashed border-slate-700 rounded-xl text-center space-y-1 bg-slate-950/50">
                <Upload className="w-6 h-6 text-cyan-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-300">Drop your STL / OBJ design file here</p>
                <p className="text-[11px] text-slate-500">Supports .STL, .OBJ, .3MF (Max 25 MB)</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
                >
                  {isSubmitting ? 'Uploading to Van...' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

