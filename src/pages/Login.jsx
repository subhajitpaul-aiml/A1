import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Truck, LogIn, Sparkles, Shield, User, ArrowRight } from 'lucide-react';
import { DEMO_USERS } from '../services/mockData';

export const Login = () => {
  const { login, loginWithDemo, availableRoles } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardPath = (roleKey) => {
    switch (roleKey) {
      case 'admin': return '/dashboard/admin';
      case 'school': return '/dashboard/school';
      case 'instructor': return '/dashboard/instructor';
      case 'teacher': return '/dashboard/teacher';
      case 'student':
      default:
        return '/dashboard/student';
    }
  };

  const handleStandardLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please provide both email and password.', 'error');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password, role);
    setIsLoading(false);

    if (result.success) {
      showToast(`Welcome back, ${result.user.name}! (${result.user.role})`, 'success');
      navigate(getDashboardPath(result.user.roleKey));
    }
  };

  const handleQuickDemoLogin = (roleKey) => {
    const res = loginWithDemo(roleKey);
    showToast(`Quick-switched to ${res.user.role} perspective!`, 'success');
    navigate(getDashboardPath(roleKey));
  };

  return (
    <div className="py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center shadow-glow">
              <Truck className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl text-white">MakerSpace on Wheels</span>
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sign in to your platform</h2>
          <p className="text-xs text-slate-400">Access your role-tailored dashboard and fabrication tools</p>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-3.5 rounded-xl bg-cyan-950/50 border border-cyan-800/60 text-xs text-cyan-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-cyan-300">
            <Shield className="w-4 h-4" />
            <span>Prototype Mode: 1-Click Role Switcher</span>
          </div>
          <p className="text-[11px] text-cyan-400/80">
            Click any role below to immediately test its unique dashboard layout without filling passwords:
          </p>
        </div>

        {/* 1-Click Quick Demo Login Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableRoles.map((r) => (
            <button
              key={r.roleKey}
              onClick={() => handleQuickDemoLogin(r.roleKey)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-left transition text-xs flex flex-col justify-between"
            >
              <div className="font-bold text-cyan-400 truncate">{r.role}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{r.name.split(' ')[0]}</div>
            </button>
          ))}
        </div>

        {/* Standard Credentials Form */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
          <form onSubmit={handleStandardLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="school">School Administrator</option>
                <option value="instructor">Workshop Instructor</option>
                <option value="admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center justify-center gap-2 shadow-glow"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-400 hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

