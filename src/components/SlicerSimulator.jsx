import React, { useState, useEffect, useRef } from 'react';
import { Layers, Sliders, Play, Pause, RotateCcw, Flame, Clock, Sparkles } from 'lucide-react';

export const SlicerSimulator = () => {
  const canvasRef = useRef(null);
  const [currentLayer, setCurrentLayer] = useState(42);
  const totalLayers = 120;
  const [infillDensity, setInfillDensity] = useState(20);
  const [infillPattern, setInfillPattern] = useState('gyroid'); // 'grid' | 'gyroid' | 'honeycomb'
  const [isPlaying, setIsPlaying] = useState(false);
  const [layerHeight, setLayerHeight] = useState('0.20'); // mm

  // Calculated estimates based on current parameters
  const printTimeMins = Math.round((totalLayers * (infillDensity / 20) * 0.35) + 12);
  const filamentGrams = ((totalLayers * 0.22) * (infillDensity / 20)).toFixed(1);
  const filamentMeters = (filamentGrams / 3.0).toFixed(1);

  // Auto-play layer animation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentLayer((prev) => (prev >= totalLayers ? 1 : prev + 1));
      }, 70);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalLayers]);

  // Draw 2D Slicer layer on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear background (Bed plate with grid)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Bed Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Outer Shell Wall based on currentLayer height scaling
    const scale = 0.6 + (Math.sin((currentLayer / totalLayers) * Math.PI) * 0.4);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 95 * scale;

    // Perimeter / Walls (Cyan)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Inner Perimeter
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Center hole (Mechanical cylinder)
    const holeRadius = 24 * scale;
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, holeRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // Infill Pattern clipping
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 8, 0, Math.PI * 2);
    ctx.arc(centerX, centerY, holeRadius + 4, 0, Math.PI * 2, true);
    ctx.clip();

    ctx.strokeStyle = '#f97316'; // Amber/orange infill lines
    ctx.lineWidth = 1.8;

    const spacing = Math.max(8, Math.round(50 - (infillDensity * 1.5)));

    if (infillPattern === 'grid') {
      // Crosshatch Grid
      for (let x = centerX - radius; x <= centerX + radius; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - radius);
        ctx.lineTo(x, centerY + radius);
        ctx.stroke();
      }
      for (let y = centerY - radius; y <= centerY + radius; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(centerX - radius, y);
        ctx.lineTo(centerX + radius, y);
        ctx.stroke();
      }
    } else if (infillPattern === 'gyroid') {
      // Gyroid Sinusoidal Waves
      const phase = (currentLayer * 0.15);
      for (let y = centerY - radius; y <= centerY + radius; y += spacing) {
        ctx.beginPath();
        for (let x = centerX - radius; x <= centerX + radius; x += 4) {
          const waveY = y + Math.sin((x * 0.08) + phase) * (spacing * 0.45);
          if (x === centerX - radius) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }
    } else {
      // Honeycomb Hexagons
      const hexR = spacing * 0.7;
      for (let x = centerX - radius; x <= centerX + radius; x += hexR * 1.7) {
        for (let y = centerY - radius; y <= centerY + radius; y += hexR * 1.5) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const hx = x + hexR * Math.cos(angle);
            const hy = y + hexR * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Simulated Active Nozzle Extrusion Head Position
    const nozzleAngle = (Date.now() * 0.003) % (Math.PI * 2);
    const nozzleX = centerX + Math.cos(nozzleAngle) * (radius - 12);
    const nozzleY = centerY + Math.sin(nozzleAngle) * (radius - 12);

    ctx.save();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(nozzleX, nozzleY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

  }, [currentLayer, infillDensity, infillPattern, totalLayers]);

  return (
    <div className="rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Interactive Slicer Simulator (G-CODE Preview)
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Layer-by-Layer Slicing & Infill Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            See how our mobile lab software converts 3D CAD meshes into micro-thin toolpaths.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-amber-500 text-slate-950'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Print' : 'Auto Simulate'}</span>
          </button>
          <button
            onClick={() => setCurrentLayer(1)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            title="Reset to Layer 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Canvas Cross Section */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="w-full max-w-[340px] aspect-square block"
            />

            {/* Canvas Legend */}
            <div className="absolute bottom-2.5 inset-x-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span className="text-slate-300">Outer Walls</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                <span className="text-slate-300">Internal Infill</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-rose-300 font-mono">Nozzle 215°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls & Slicing Parameters */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Layer Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Active Layer Height</span>
              <span className="font-mono font-bold text-cyan-400">
                Layer {currentLayer} / {totalLayers} (Z: {(currentLayer * parseFloat(layerHeight)).toFixed(2)} mm)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={totalLayers}
              value={currentLayer}
              onChange={(e) => setCurrentLayer(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Infill Pattern Buttons */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Internal Infill Geometry</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gyroid', label: 'Gyroid (Organic)' },
                { id: 'grid', label: 'Grid (Standard)' },
                { id: 'honeycomb', label: 'Honeycomb (Max Strength)' }
              ].map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => setInfillPattern(pat.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition border ${
                    infillPattern === pat.id
                      ? 'bg-orange-500 text-slate-950 border-orange-400 shadow-glow-orange'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {pat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Infill Density Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Infill Density (Weight & Rigidity)</span>
              <span className="font-mono font-bold text-orange-400">{infillDensity}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={infillDensity}
              onChange={(e) => setInfillDensity(parseInt(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Slicer Telemetry Output HUD */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Print Time</div>
              <div className="text-base font-extrabold text-cyan-400 font-mono mt-0.5">
                {printTimeMins} min
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">PLA Filament</div>
              <div className="text-base font-extrabold text-orange-400 font-mono mt-0.5">
                {filamentGrams}g
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Layer Pitch</div>
              <div className="text-base font-extrabold text-emerald-400 font-mono mt-0.5">
                {layerHeight} mm
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

