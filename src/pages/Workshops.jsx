import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Users, 
  Sparkles, 
  ChevronRight, 
  SlidersHorizontal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { WORKSHOPS } from '../services/mockData';
import { BookingModal } from '../components/BookingModal';
import { WorkshopDetailModal } from '../components/WorkshopDetailModal';
import { CostCalculator } from '../components/CostCalculator';

export const Workshops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorkshopForBooking, setSelectedWorkshopForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedWorkshopForDetail, setSelectedWorkshopForDetail] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const categories = ['All', 'Foundations', 'Design & Software', 'Makerspace Core', 'Engineering & Innovation', 'Applied STEM'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'All Levels'];

  const filteredWorkshops = WORKSHOPS.filter((ws) => {
    const matchesSearch = ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.softwareUsed.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'All' || ws.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || ws.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const handleBook = (ws) => {
    setSelectedWorkshopForBooking(ws);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Middle School STEM Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Learning <span className="gradient-text">Workshops</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hands-on, immersive programs conducted right at your school inside or alongside our high-tech mobile fabrication lab. Every student produces a real physical 3D artifact.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workshops, software, or keywords..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Level:</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {difficulties.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {(searchQuery || selectedDifficulty !== 'All' || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDifficulty('All');
                    setSelectedCategory('All');
                  }}
                  className="text-xs text-cyan-400 hover:underline px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Workshop Cards Grid */}
        <div className="space-y-8">
          {filteredWorkshops.map((ws, index) => (
            <div
              key={ws.id}
              className="glass-card rounded-3xl border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-8 overflow-hidden transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Image & Quick Badges */}
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden h-64 sm:h-72 lg:h-full min-h-[240px]">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 text-cyan-400 border border-cyan-800/60 backdrop-blur-md">
                      {ws.category}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-slate-950/80 text-amber-300 border border-amber-800/60 backdrop-blur-md">
                      {ws.difficulty}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 font-mono">
                      ⏱ {ws.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 font-medium text-slate-300">
                      👥 Max {ws.maxStudents} Students
                    </span>
                  </div>
                </div>

                {/* Content & Outcomes */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                        Program #{index + 1} • {ws.grades}
                      </div>
                      <div className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                        ★ {ws.rating} ({ws.reviewsCount} School Reviews)
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {ws.title}
                    </h2>
                    <p className="text-sm font-medium text-cyan-300 mt-0.5">
                      {ws.tagline}
                    </p>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      {ws.description}
                    </p>
                  </div>

                  {/* Learning Outcomes Bullets */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Key Learning Outcomes</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                      {ws.learningOutcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Software & Hardware Info */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-200">Software Used:</strong> {ws.softwareUsed.join(' • ')}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-200">Hardware Brought:</strong> {ws.hardwareIncluded.join(' • ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleBook(ws)}
                        className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 active:scale-95 transition flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book for Your School</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}

          {filteredWorkshops.length === 0 && (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
              <p className="text-slate-400 text-base">No workshops matched your search criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedDifficulty('All'); setSelectedCategory('All'); }}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        workshop={selectedWorkshopForBooking}
      />
    </div>
  );
};

