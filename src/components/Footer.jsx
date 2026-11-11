import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Heart, 
  Sparkles, 
  Layers, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed! You will receive our monthly STEM Maker Curriculum updates.', 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-glow">
                <Truck className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">MakerSpace</span>
                <span className="ml-1.5 text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50 font-semibold uppercase">
                  On Wheels
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering middle-school students with hands-on digital fabrication, rapid prototyping, CAD modelling, and 3D printing. We bring cutting-edge maker laboratories straight to your schoolyard.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Tagline: <strong className="text-cyan-400">Learn. Design. Create. Innovate.</strong></span>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Join STEM Educator Newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter school or teacher email"
                  className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 shadow-glow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Workshops */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Core Programs</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/workshops" className="hover:text-cyan-400 transition flex items-center gap-1">
                  Introduction to 3D Printing
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-cyan-400 transition flex items-center gap-1">
                  Beginner CAD Modelling
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-cyan-400 transition flex items-center gap-1">
                  Digital Fabrication
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-cyan-400 transition flex items-center gap-1">
                  Rapid Prototyping
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-cyan-400 transition flex items-center gap-1">
                  Creative STEM Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & CAD Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-orange-400" />
              <span>CAD & Software</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href="https://www.tinkercad.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center justify-between group"
                >
                  <span>Autodesk Tinkercad</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.autodesk.com/products/fusion-360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center justify-between group"
                >
                  <span>Autodesk Fusion</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                </a>
              </li>
              <li>
                <Link to="/cad-hub" className="hover:text-cyan-400 transition">
                  FDM Slicing 101
                </Link>
              </li>
              <li>
                <Link to="/cad-hub" className="hover:text-cyan-400 transition">
                  Digital to Physical Guide
                </Link>
              </li>
              <li>
                <Link to="/learning" className="hover:text-cyan-400 transition">
                  Student Project Submissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Mobile Dispatch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mobile Lab Fleet Hub 1, Innovation Tech Way, District 7</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+1 (800) 555-MAKER</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>lab-dispatch@makerspaceonwheels.org</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/school-registration"
                  className="inline-block px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition"
                >
                  Schedule Lab Visit →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MakerSpace on Wheels. All rights reserved. STEM Aligned Curriculum.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-300 transition">Mission & Safety</Link>
            <Link to="/contact" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

