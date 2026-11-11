import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Truck, 
  Layers, 
  Box, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Star, 
  Zap, 
  Heart,
  ChevronRight,
  Printer
} from 'lucide-react';
import { WORKSHOPS, FEATURED_PROJECTS, TESTIMONIALS, HOW_IT_WORKS_STEPS } from '../services/mockData';
import { ModelViewer3D } from '../components/ModelViewer3D';
import { BookingModal } from '../components/BookingModal';

export const Home = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 bg-grid-pattern">
        {/* Glowing Orbs in Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-orange-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-300 shadow-glow">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Next-Gen Mobile STEM & 3D Printing Lab</span>
                <span className="hidden sm:inline text-slate-500">|</span>
                <span className="hidden sm:inline text-orange-400 font-medium">Visiting Middle Schools</span>
              </div>

              {/* Main Heading as strictly requested */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
                Turn Your Ideas <br className="hidden sm:block" />
                <span className="gradient-text">Into Reality.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                MakerSpace on Wheels brings state-of-the-art digital fabrication, CAD modeling, and 3D printing education directly to middle-school doorsteps. We turn curiosity into functional engineering artifacts.
              </p>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/school-registration"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started (Book Visit)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/workshops"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base glass-card text-white hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 transition flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Explore Workshops</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>STEM Aligned Curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>100% Mobile & Self-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>12+ High-Speed 3D Printers</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live 3D CAD Viewport */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                {/* Visual frame accent */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-orange-500/30 rounded-3xl blur-md" />
                <div className="relative">
                  <ModelViewer3D initialModel="van" height="420px" />
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl backdrop-blur-xl animate-float">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Printed by Students</p>
                  <p className="text-sm font-extrabold text-white">4,890+ Prototypes</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT THE PROJECT SECTION */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
                  alt="Students learning 3D printing inside makerspace van"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950 uppercase tracking-wider">
                    On-Site Discovery
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">
                    Democratizing High-Tech Fabrication for Every Classroom
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Equipped with Bambu Lab & Prusa CoreXY printers, dual-filament extrusion, safety air scrubbers, and CAD laptops.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  About The Project
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                  Bridging the Gap Between Screen & Physical Invention
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Most middle schools dream of having an innovation lab, but are held back by equipment costs, space limitations, and specialized staff training. <strong>MakerSpace on Wheels</strong> eliminates every barrier.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/70">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Self-Contained Van Lab</h4>
                  <p className="text-xs text-slate-400 mt-1">Requires zero classroom renovation. We park outside and run interactive workshops inside our lab or school hall.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/70">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Hands-On Takeaways</h4>
                  <p className="text-xs text-slate-400 mt-1">Every student designs, slices, prints, and takes home their own physical customized creation.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span>Learn more about our educational mission</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* LEARNING PROGRAMS SECTION */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Curriculum Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Our Signature Learning Workshops
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Meticulously engineered for 6th to 9th grade learners. Aligned with Next Generation Science Standards (NGSS) and design thinking workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKSHOPS.slice(0, 3).map((ws) => (
              <div 
                key={ws.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-800 hover:border-cyan-500/40"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-800/50">
                      {ws.category}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-amber-300 border border-amber-800/50">
                      {ws.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs font-semibold px-2 py-1 rounded bg-slate-950/80 text-slate-300">
                    ⏱ {ws.duration}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {ws.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5">{ws.tagline}</p>
                    <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                      {ws.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-3">
                    <div className="text-[11px] text-slate-400">
                      <strong className="text-slate-200">Tools:</strong> {ws.softwareUsed.join(', ')}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => openBooking(ws)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition shadow-glow flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Workshop</span>
                      </button>
                      <Link
                        to="/workshops"
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/workshops"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition"
            >
              <span>View All 5 Learning Programs & Syllabus</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              How MakerSpace on Wheels Works
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              We handle 100% of the logistics, equipment setup, raw supplies, and instructor facilitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div 
                key={step.step}
                className="relative p-6 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between"
              >
                <div className="text-3xl font-black text-cyan-500/20 mb-4 font-mono">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600 z-10">
                    <ArrowRight className="w-5 h-5 text-cyan-500/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED STUDENT PROJECTS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Student Inventions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Featured Student CAD & 3D Prints
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Real designs conceived, drafted in Tinkercad, and printed during MakerSpace on Wheels school sessions.
              </p>
            </div>
            <Link
              to="/learning"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300"
            >
              <span>Explore Student Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-[11px] text-pink-400 font-semibold flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-pink-400" />
                    <span>{proj.likes}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {proj.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-200">{proj.student}</p>
                      <p className="text-[10px] text-slate-500">{proj.school}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                        {proj.software.split(' ')[1] || 'CAD'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              The Maker Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Why Schools Choose MakerSpace on Wheels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Zero Capital Expense for Schools</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                No need to spend $40,000+ setting up a permanent lab that goes unmaintained. We supply the hardware, raw materials, ventilation, and expert instructors on demand.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Rapid High-Speed CoreXY Fleet</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our mobile lab uses high-speed 3D printers that complete student prints in 20 to 45 minutes instead of 6 hours, ensuring every child takes home their print the very same day.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/30 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Certified STEM Instructors</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Every workshop is facilitated by certified makers and fabrication educators who specialize in middle-school engagement and project-based learning.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Educator & Student Voices
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Loved by Principals, Teachers & Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.author}</h4>
                    <p className="text-xs text-cyan-400 font-medium">{t.role} • {t.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-cyan-500/40 shadow-glow">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 text-center space-y-5">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60 uppercase tracking-widest inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Bookings Open for 2026 - 2027 Academic Year
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to Bring the Mobile Maker Lab to Your School?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                Reserve a date for your middle school. Our mobile fabrication van comes loaded with 3D printers, CAD laptops, raw materials, and an unforgettable learning experience.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/school-registration"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a School Date</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 transition"
                >
                  Contact Dispatch Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        workshop={selectedWorkshop}
      />

    </div>
  );
};

