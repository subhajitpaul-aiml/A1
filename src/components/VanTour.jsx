import React, { useState } from 'react';
import { Truck, Sparkles, CheckCircle2, ChevronRight, Zap, Shield, Cpu, Flame } from 'lucide-react';

export const VanTour = () => {
  const [activeZone, setActiveZone] = useState(0);

  const zones = [
    {
      id: 'printers',
      title: '3D Printer Farm (12 Units)',
      subtitle: 'Enclosed High-Speed CoreXY Technology',
      description: 'Twelve high-speed CoreXY 3D printers mounted on vibration-dampened aircraft aluminum racks. Able to complete student prototypes in 20–45 minutes with automatic bed leveling and lidar spaghetti detection.',
      specs: ['Print Speeds: Up to 500 mm/s', 'Hotend: 300°C All-Metal', 'Filament: 1.75mm PLA / PETG'],
      icon: 'Flame',
      tag: 'Core Fabrication'
    },
    {
      id: 'cad',
      title: 'Mobile CAD Laptop Station',
      subtitle: '30 Touchscreen Laptops with Precision Mice',
      description: 'A dedicated onboard deployable IT lab. When our van arrives, instructors can set up 30 touchscreen design stations inside the van or roll our portable cases directly into the school library.',
      specs: ['Autodesk Tinkercad Pre-loaded', 'PrusaSlicer & Bambu Studio', 'Dual 5G Cellular Hotspots'],
      icon: 'Cpu',
      tag: 'Student Software'
    },
    {
      id: 'filtration',
      title: 'HEPA & Activated Carbon Air Scrubbers',
      subtitle: '100% Zero-Fume Indoor-Safe Clean Air',
      description: 'Dual industrial-grade positive-pressure ventilation scrubbers continuously circulate and filter all air through medical-grade HEPA H13 and activated carbon beds to trap any micro-particulates.',
      specs: ['99.97% Particulate Filtration', 'Zero VOC Emissions', 'OSHA & School Board Approved'],
      icon: 'Shield',
      tag: 'Student Safety'
    },
    {
      id: 'power',
      title: '10 kWh Lithium Battery Bank',
      subtitle: 'Silent, Clean Off-Grid Operation',
      description: 'Equipped with heavy-duty LiFePO4 battery storage and a 6000W pure sine-wave inverter. The van runs completely silently for 8 hours without needing gas generators or school electrical cords.',
      specs: ['10 kWh LiFePO4 Energy', '6000W Pure Sine Wave', 'Zero Noise / Zero Fumes'],
      icon: 'Zap',
      tag: 'Clean Energy'
    },
    {
      id: 'tools',
      title: 'Post-Processing & Inspection Bench',
      subtitle: 'Digital Calipers, Deburring & Assembly',
      description: 'A stainless steel workstation with digital micrometers, metric hex drivers, support removal snips, and safety glasses. Students inspect physical print tolerances to ensure snap-fits match CAD blueprints.',
      specs: ['Digital Calipers (0.01mm resolution)', 'Support Removal Pliers', 'Snap-Fit Test Jigs'],
      icon: 'CheckCircle2',
      tag: 'Engineering QC'
    }
  ];

  return (
    <div className="rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
            <Truck className="w-4 h-4" />
            Inside The Mobile Maker Lab
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Explore the Van Interior & Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            A self-contained digital fabrication laboratory custom-built inside a 24-foot Mercedes-Benz Sprinter chassis.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          Chassis Length: <strong className="text-cyan-300">24 Feet</strong> • Capacity: <strong className="text-cyan-300">30 Students</strong>
        </div>
      </div>

      {/* Hotspots Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {zones.map((zone, idx) => (
          <button
            key={zone.id}
            onClick={() => setActiveZone(idx)}
            className={`p-3 rounded-2xl text-left border transition-all ${
              activeZone === idx
                ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-glow'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-cyan-400">Zone 0{idx + 1}</div>
            <div className="text-xs font-bold mt-1 line-clamp-1">{zone.title.split(' ')[0]} {zone.title.split(' ')[1]}</div>
          </button>
        ))}
      </div>

      {/* Active Zone Detail Showcase */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
              {zones[activeZone].tag}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Zone 0{activeZone + 1} of 05
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {zones[activeZone].title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-orange-400">
            {zones[activeZone].subtitle}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {zones[activeZone].description}
          </p>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technical Specifications:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {zones[activeZone].specs.map((s, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-2xl shadow-glow">
            🚐
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Maker Van Unit Alpha-01</h4>
            <p className="text-xs text-slate-400 mt-1">
              Ready for school deployment. Parks in any bus loading stall.
            </p>
          </div>
          <div className="pt-2 w-full">
            <a
              href="#/school-registration"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-slate-950 transition flex items-center justify-center gap-1.5 shadow-glow-orange"
            >
              <span>Schedule Van for Your School</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

