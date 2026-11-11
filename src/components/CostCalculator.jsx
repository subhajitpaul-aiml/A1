import React, { useState } from 'react';
import { Calculator, Sparkles, DollarSign, Clock, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CostCalculator = () => {
  const [studentCount, setStudentCount] = useState(30);
  const [prototypeSize, setPrototypeSize] = useState('medium'); // small, medium, large
  const [filamentType, setFilamentType] = useState('eco-pla');

  // Calculation parameters
  const weightPerStudent = prototypeSize === 'small' ? 18 : prototypeSize === 'medium' ? 38 : 65; // grams
  const timePerStudentMins = prototypeSize === 'small' ? 22 : prototypeSize === 'medium' ? 38 : 55; // mins
  const totalGrams = studentCount * weightPerStudent;
  const spoolsNeeded = Math.ceil(totalGrams / 1000);
  
  // Parallel print fleet of 12 CoreXY printers
  const batchRuns = Math.ceil(studentCount / 12);
  const totalLabTimeHours = ((batchRuns * timePerStudentMins) / 60).toFixed(1);

  // Cost comparison (Outsourced Bureau vs MakerSpace on Wheels)
  const bureauCostPerPart = prototypeSize === 'small' ? 25 : prototypeSize === 'medium' ? 45 : 75;
  const totalBureauCost = studentCount * bureauCostPerPart;
  const mobileVanEstimatedCost = Math.round(studentCount * 18 + 150);
  const totalSavings = Math.max(0, totalBureauCost - mobileVanEstimatedCost);

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/30 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            School STEM Budget & Material Estimator
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Calculate Your School's Fabrication Cost & Savings
          </h3>
          <p className="text-xs text-slate-400">
            Compare our all-inclusive mobile lab service vs setting up and maintaining an in-house fabrication lab.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-semibold self-start sm:self-auto">
          ● Includes 12x 3D Printers & Supplies
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Student count slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Number of Participating Students</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">{studentCount} Students</span>
            </div>
            <input
              type="range"
              min={15}
              max={120}
              step={5}
              value={studentCount}
              onChange={(e) => setStudentCount(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>15 (Small Cohort)</span>
              <span>60 (Double Class)</span>
              <span>120 (Full Grade)</span>
            </div>
          </div>

          {/* Prototype Size Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Target Prototype Complexity</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'small', label: 'Small (~18g)', desc: 'Cable Clips / Whistles' },
                { id: 'medium', label: 'Medium (~38g)', desc: 'Planetary Gears / Pots' },
                { id: 'large', label: 'Large (~65g)', desc: 'Robot Shells / Domes' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPrototypeSize(p.id)}
                  className={`p-2.5 rounded-xl text-left border transition ${
                    prototypeSize === p.id
                      ? 'bg-cyan-950 border-cyan-500 text-white shadow-glow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{p.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Filament Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Filament Polymer Preference</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setFilamentType('eco-pla')}
                className={`p-2.5 rounded-xl text-left border transition flex items-center justify-between ${
                  filamentType === 'eco-pla'
                    ? 'bg-emerald-950/80 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-bold text-emerald-400">Biodegradable Eco-PLA</div>
                  <div className="text-[10px] text-slate-400">Zero fumes, cornstarch-based</div>
                </div>
                {filamentType === 'eco-pla' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                onClick={() => setFilamentType('recycled-petg')}
                className={`p-2.5 rounded-xl text-left border transition flex items-center justify-between ${
                  filamentType === 'recycled-petg'
                    ? 'bg-cyan-950/80 border-cyan-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-bold text-cyan-400">Recycled PETG Tough</div>
                  <div className="text-[10px] text-slate-400">Impact & water resistant</div>
                </div>
                {filamentType === 'recycled-petg' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>

        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          
          <div className="text-center pb-4 border-b border-slate-800 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Estimated District Savings vs Commercial Outsourcing
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              ${totalSavings.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">
              Commercial Bureau (${totalBureauCost.toLocaleString()}) vs MakerSpace Mobile Lab (~${mobileVanEstimatedCost.toLocaleString()})
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                Raw Filament Required
              </span>
              <div className="text-base font-bold text-white font-mono mt-1">
                {(totalGrams / 1000).toFixed(2)} kg ({spoolsNeeded} Spools)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                On-Site Mobile Lab Time
              </span>
              <div className="text-base font-bold text-cyan-400 font-mono mt-1">
                {totalLabTimeHours} Hours (12 Printers)
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <a
              href="#/school-registration"
              className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <span>Lock In Date with This Cohort ({studentCount} Students)</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
