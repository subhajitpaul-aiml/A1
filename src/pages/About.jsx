import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Target, 
  Eye, 
  Compass, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  ShieldCheck, 
  Award,
  ArrowRight
} from 'lucide-react';
import { VanTour } from '../components/VanTour';

export const About = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 inline-flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            Our Story & Educational Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Empowering the Next Generation of <span className="gradient-text">Makers & Innovators</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            MakerSpace on Wheels is an interactive, mobile educational laboratory designed specifically for middle-school students. We break down the barriers of cost, equipment maintenance, and curriculum friction.
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl glass-card border border-cyan-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To democratize advanced digital fabrication, 3D printing, and CAD modeling for every middle-school student, regardless of their school's tech budget. We ignite lifelong curiosity in mechanical engineering, spatial problem solving, and sustainable prototyping.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span>Brand Tagline:</span>
              <span className="text-white">Learn. Design. Create. Innovate.</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-orange-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A future where every child sees themselves as an active inventor rather than just a passive technology consumer. We envision public and private schools seamlessly integrating hands-on fabrication into general science and math curricula.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-orange-400">
              <span>Coverage Goal:</span>
              <span className="text-white">100+ Schools & 15,000 Students Annually</span>
            </div>
          </div>
        </div>

        {/* Educational Objectives */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Core Pedagogy
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Educational Objectives for Middle Schoolers
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Middle school (Ages 11-14) is the pivotal cognitive window when spatial reasoning and engineering self-efficacy solidify.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-cyan-400 font-mono font-bold text-lg">01. Spatial Reasoning</div>
              <h4 className="text-base font-bold text-white">Three-Dimensional Geometry</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transforming 2D sketches into 3D isometric structures. Students internalize coordinate axes (X, Y, Z), millimeters, and bounding volumes.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-orange-400 font-mono font-bold text-lg">02. Design Thinking</div>
              <h4 className="text-base font-bold text-white">The Iterate-Fail-Refine Loop</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Engineering failures are treated as data points. When a 3D joint prints too tight, students adjust tolerances in CAD and reprint immediately.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-emerald-400 font-mono font-bold text-lg">03. Material Ecology</div>
              <h4 className="text-base font-bold text-white">Sustainable Polymer Awareness</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learning the difference between cornstarch-derived biodegradable PLA, recycled PETG, and petroleum plastics. Encouraging green engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Why 3D Printing Matters Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              Impact Analysis
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Why 3D Printing in Middle School?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Traditional computer classes teach students how to write documents or browse pages. 3D printing bridges the digital universe to physical reality.
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Instant Gratification of Effort:</strong> Watching a printhead lay down layers based on code they designed builds immense pride and confidence.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Inclusivity Across Skill Levels:</strong> Intuitive block-based CAD tools like Tinkercad allow students who struggle with formulas to excel visually.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Preparation for Modern Careers:</strong> Biomedical implants, electric vehicles, and aerospace habitats are now 3D printed. This is the foundation.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
                alt="Students inspecting CAD models on screen"
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Interactive Van Interior Architecture Tour */}
        <VanTour />

        {/* Mobile Lab Specs */}
        <div className="p-8 sm:p-10 rounded-3xl glass-card border border-slate-700 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Fleet Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Our Mobile Maker Van Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Each Mercedes Sprinter / Ford Transit van is custom outfitted by fabrication engineers into a self-reliant mobile makerspace.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-2xl font-black text-cyan-400 font-mono">12x</div>
              <div className="text-xs font-semibold text-white mt-1">CoreXY 3D Printers</div>
              <div className="text-[11px] text-slate-400">High-speed Bambu & Prusa</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-2xl font-black text-orange-400 font-mono">30x</div>
              <div className="text-xs font-semibold text-white mt-1">CAD Laptops</div>
              <div className="text-[11px] text-slate-400">Pre-configured with Tinkercad</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-2xl font-black text-emerald-400 font-mono">HEPA</div>
              <div className="text-xs font-semibold text-white mt-1">Air Filtration</div>
              <div className="text-[11px] text-slate-400">Zero VOC fumes, indoor safe</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-2xl font-black text-pink-400 font-mono">10 kWh</div>
              <div className="text-xs font-semibold text-white mt-1">Lithium Battery</div>
              <div className="text-[11px] text-slate-400">Silent, self-powered sessions</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/school-registration"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-glow hover:brightness-110 transition"
          >
            <span>Invite Our Mobile Van to Your School</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

