import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="py-24 text-center px-4 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
        <Truck className="w-8 h-8" />
      </div>
      <div>
        <h1 className="text-5xl font-black text-white font-mono">404</h1>
        <h2 className="text-xl font-bold text-slate-200 mt-2">Mobile Lab Route Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mt-1">
          The requested page seems to have taken an unexpected detour outside our mobile dispatch range.
        </p>
      </div>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition shadow-glow"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

